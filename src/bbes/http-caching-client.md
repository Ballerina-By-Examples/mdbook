# Caching Client

 HTTP caching is enabled by default in HTTP client endpoints.
 Users can configure caching using the `cache` field in the client configurations.<br/><br/>
 For more information on the underlying module,
 see the [HTTP module](https:docs.central.ballerina.io/ballerina/http/latest/).

```go
import ballerina/http;

// Caching can be enabled by setting `enabled:true` in the `cache` config of the client.
// In this example, the `isShared` field of the `cacheConfig` is set
// to true, as the cache will be a public cache in this particular scenario.
//
// The default caching policy is to cache a response only if it contains a
// `cache-control` header and either an `etag` header, or a `last-modified`
// header. The user can control this behaviour by setting the `policy` field of
// the `cacheConfig`. Currently, there are only 2 policies:
// `CACHE_CONTROL_AND_VALIDATORS` (the default policy) and `RFC_7234`.

http:Client cachingEP = checkpanic new ("http://localhost:8080",
                        {cache: {enabled: true, isShared: true}});
service / on new http:Listener(9090) {

    resource function get cache(http:Request req)
            returns http:Response|error? {
        http:Response response = check cachingEP->forward("/hello", req);
        // If the request was successful, an HTTP response will be
        // returned.
        return response;
    }
}

service / on new http:Listener(8080) {

    resource function 'default hello() returns http:Response {
        http:Response res = new;
        // The `ResponseCacheControl` object in the `Response` object can be
        // used for setting the cache control directives associated with the
        // response. In this example, `max-age` directive is set to 15 seconds
        // indicating that the response will be fresh for 15 seconds. The
        // `must-revalidate` directive instructs that the cache should not
        // serve a stale response without validating it with the origin server
        // first. The `public` directive is set by setting `isPrivate=false`.
        // This indicates that the response can be cached even by intermediary
        // caches which serve multiple users.
        http:ResponseCacheControl resCC = new;

        resCC.maxAge = 15;
        resCC.mustRevalidate = true;
        resCC.isPrivate = false;
        res.cacheControl = resCC;
        json payload = {"message": "Hello, World!"};

        // The `setETag()` function can be used for generating ETags for
        // `string`, `json`, and `xml` types. This uses the `getCRC32()`
        // function from the `ballerina/crypto` module for generating the ETag.
        res.setETag(payload);

        // The `setLastModified()` function sets the current time as the
        // `last-modified` header.
        res.setLastModified();

        res.setPayload(payload);
        // When sending the response, if the `cacheControl` field of the
        // response is set, and the user has not already set a `cache-control`
        // header, a `cache-control` header will be set using the directives set
        // in the `cacheControl` object.
        return res;

    }
}
```

#### Output

```go
# The two services have to be run separately to observe the following output.
# For clarity, only the relevant parts of the HTTP trace logs have been included here.
bal run http_caching_client.bal -- -Cballerina.http.traceLogConsole=true

# The caching proxy receives a request from a client.
[2021-11-26 09:52:32,588] TRACE {http.tracelog.downstream} - [id: 0x6c720951, correlatedSource: n/a, host:/0:0:0:0:0:0:0:1:9090 - remote:/0:0:0:0:0:0:0:1:50902] INBOUND: DefaultHttpRequest(decodeResult: success, version: HTTP/1.1)
GET /cache HTTP/1.1
Host: localhost:9090
User-Agent: curl/7.64.1
Accept: */*

# The proxy in turn, makes a request to the backend service.
[2021-11-26 09:52:32,780] TRACE {http.tracelog.upstream} - [id: 0x99c1790f, correlatedSource: 0x6c720951, host:/127.0.0.1:50903 - remote:localhost/127.0.0.1:8080] OUTBOUND: DefaultHttpRequest(decodeResult: success, version: HTTP/1.1)
GET /hello HTTP/1.1
Accept: */*
host: localhost:8080
user-agent: ballerina
connection: keep-alive

# The backend service responds with a `200 OK` and it contains `etag` and `cache-control` headers. This response can be cached and as such, the caching client caches it. As seen from the `max-age` directive of the 'cache-control` header, this response is valid for 15 seconds.
[2021-11-26 09:52:32,896] TRACE {http.tracelog.upstream} - [id: 0x99c1790f, correlatedSource: 0x6c720951, host:/127.0.0.1:50903 - remote:localhost/127.0.0.1:8080] INBOUND: DefaultHttpResponse(decodeResult: success, version: HTTP/1.1)
HTTP/1.1 200 OK
etag: 620328e8
last-modified: Fri, 26 Nov 2021 04:22:32 GMT
content-type: application/json
cache-control: must-revalidate,public,max-age=15
server: ballerina
date: Fri, 26 Nov 2021 09:52:32 +0530
content-length: 27
{"message":"Hello, World!"}

# The response is sent back to the client.
[2021-11-26 09:52:32,916] TRACE {http.tracelog.downstream} - [id: 0x6c720951, correlatedSource: n/a, host:localhost/0:0:0:0:0:0:0:1:9090 - remote:/0:0:0:0:0:0:0:1:50902] OUTBOUND: DefaultFullHttpResponse(decodeResult: success, version: HTTP/1.1, content: CompositeByteBuf(ridx: 0, widx: 27, cap: 27, components=1))
HTTP/1.1 200 OK
etag: 620328e8
last-modified: Fri, 26 Nov 2021 04:22:32 GMT
content-type: application/json
cache-control: must-revalidate,public,max-age=15
date: Fri, 26 Nov 2021 09:52:32 +0530
server: ballerina
content-length: 27, 27B
{"message":"Hello, World!"}

# Subsequent requests to the proxy within the next 15 seconds are served from the proxy's cache. As seen here, the backend service is not contacted.
[2021-11-26 09:52:40,143] TRACE {http.tracelog.downstream} - [id: 0xc79f9038, correlatedSource: n/a, host:/0:0:0:0:0:0:0:1:9090 - remote:/0:0:0:0:0:0:0:1:50915] INBOUND: DefaultHttpRequest(decodeResult: success, version: HTTP/1.1)
GET /cache HTTP/1.1
Host: localhost:9090
User-Agent: curl/7.64.1
Accept: */*

# Cached response.
[2021-11-26 09:52:40,181] TRACE {http.tracelog.downstream} - [id: 0xc79f9038, correlatedSource: n/a, host:localhost/0:0:0:0:0:0:0:1:9090 - remote:/0:0:0:0:0:0:0:1:50915] OUTBOUND: DefaultFullHttpResponse(decodeResult: success, version: HTTP/1.1, content: CompositeByteBuf(ridx: 0, widx: 27, cap: 27, components=1))
HTTP/1.1 200 OK
etag: 620328e8
last-modified: Fri, 26 Nov 2021 04:22:32 GMT
content-type: application/json
cache-control: must-revalidate,public,max-age=15
date: Fri, 26 Nov 2021 09:52:32 +0530
age: 8
server: ballerina
content-length: 27, 27B
{"message":"Hello, World!"}

# Another request is sent after remaining idle for a while.
[2021-11-26 09:52:54,648] TRACE {http.tracelog.downstream} - [id: 0x083aeb7c, correlatedSource: n/a, host:/0:0:0:0:0:0:0:1:9090 - remote:/0:0:0:0:0:0:0:1:50916] INBOUND: DefaultHttpRequest(decodeResult: success, version: HTTP/1.1)
GET /cache HTTP/1.1
Host: localhost:9090
User-Agent: curl/7.64.1
Accept: */*

# This time, the request is not served from the cache. The backend service is contacted. The `if-none-match` header sends the entity tag of the now stale response, so that the backend service may determine whether this response is still valid.
[2021-11-26 09:52:54,668] TRACE {http.tracelog.upstream} - [id: 0x99c1790f, correlatedSource: 0x083aeb7c, host:/127.0.0.1:50903 - remote:localhost/127.0.0.1:8080] OUTBOUND: DefaultHttpRequest(decodeResult: success, version: HTTP/1.1)
GET /hello HTTP/1.1
Accept: */*
if-none-match: 620328e8
if-modified-since: Fri, 26 Nov 2021 04:22:32 GMT
user-agent: curl/7.64.1
host: localhost:8080
connection: keep-alive
content-length: 0

# The response has not changed. Therefore the backend services respond with a `304 Not Modified` response. Based on this, the proxy will refresh the response, so that it can continue serving the cached response.
[2021-11-26 09:52:54,673] TRACE {http.tracelog.upstream} - [id: 0x99c1790f, correlatedSource: 0x083aeb7c, host:/127.0.0.1:50903 - remote:localhost/127.0.0.1:8080] INBOUND: DefaultHttpResponse(decodeResult: success, version: HTTP/1.1)
HTTP/1.1 304 Not Modified
etag: 620328e8
last-modified: Fri, 26 Nov 2021 04:22:54 GMT
cache-control: must-revalidate,public,max-age=15
server: ballerina
date: Fri, 26 Nov 2021 09:52:54 +0530
content-length: 0

# The cached response is served yet again since the response has not changed.
[2021-11-26 09:52:54,688] TRACE {http.tracelog.downstream} - [id: 0x083aeb7c, correlatedSource: n/a, host:localhost/0:0:0:0:0:0:0:1:9090 - remote:/0:0:0:0:0:0:0:1:50916] OUTBOUND: DefaultFullHttpResponse(decodeResult: success, version: HTTP/1.1, content: CompositeByteBuf(ridx: 0, widx: 27, cap: 27, components=1))
HTTP/1.1 200 OK
content-type: application/json
cache-control: must-revalidate,public,max-age=15
date: Fri, 26 Nov 2021 09:52:54 +0530
etag: 620328e8
last-modified: Fri, 26 Nov 2021 04:22:54 GMT
age: 0
server: ballerina
content-length: 27, 27B
{"message":"Hello, World!"}

# The output for the mock service.
ball run  hello_service.bal -- -Cballerina.http.traceLogConsole=true

# For the first request that the caching proxy receives, it sends a request to the hello service.
[2021-11-26 09:52:32,797] TRACE {http.tracelog.downstream} - [id: 0x318ba81d, correlatedSource: n/a, host:/127.0.0.1:8080 - remote:/127.0.0.1:50903] INBOUND: DefaultHttpRequest(decodeResult: success, version: HTTP/1.1)
GET /hello HTTP/1.1
Accept: */*
host: localhost:8080
user-agent: ballerina
connection: keep-alive

# The service responds with a `200 OK` with the relevant caching headers set.
[2021-11-26 09:52:32,890] TRACE {http.tracelog.downstream} - [id: 0x318ba81d, correlatedSource: n/a, host:localhost/127.0.0.1:8080 - remote:/127.0.0.1:50903] OUTBOUND: DefaultFullHttpResponse(decodeResult: success, version: HTTP/1.1, content: CompositeByteBuf(ridx: 0, widx: 27, cap: 27, components=1))
HTTP/1.1 200 OK
etag: 620328e8
last-modified: Fri, 26 Nov 2021 04:22:32 GMT
content-type: application/json
cache-control: must-revalidate,public,max-age=15
content-length: 27
server: ballerina
date: Fri, 26 Nov 2021 09:52:32 +0530, 27B
{"message":"Hello, World!"}

# The backend service only gets another request when the cached response and the proxy have expired and it wants to validate it again.
[2021-11-26 09:52:54,669] TRACE {http.tracelog.downstream} - [id: 0x318ba81d, correlatedSource: n/a, host:localhost/127.0.0.1:8080 - remote:/127.0.0.1:50903] INBOUND: DefaultHttpRequest(decodeResult: success, version: HTTP/1.1)
GET /hello HTTP/1.1
Accept: */*
if-none-match: 620328e8
if-modified-since: Fri, 26 Nov 2021 04:22:32 GMT
user-agent: curl/7.64.1
host: localhost:8080
connection: keep-alive
content-length: 0

# After checking the `if-none-match` header, the service determines that the response is still the same and that the proxy can keep reusing it.
[2021-11-26 09:52:54,672] TRACE {http.tracelog.downstream} - [id: 0x318ba81d, correlatedSource: n/a, host:localhost/127.0.0.1:8080 - remote:/127.0.0.1:50903] OUTBOUND: DefaultFullHttpResponse(decodeResult: success, version: HTTP/1.1, content: CompositeByteBuf(ridx: 0, widx: 0, cap: 0, components=1))
HTTP/1.1 304 Not Modified
etag: 620328e8
last-modified: Fri, 26 Nov 2021 04:22:54 GMT
cache-control: must-revalidate,public,max-age=15
content-length: 0
server: ballerina
date: Fri, 26 Nov 2021 09:52:54 +0530, 0B
```
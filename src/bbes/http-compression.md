# Compression

 This sample demonstrates how the Ballerina HTTP service is configured to change the compression behaviour. By default, the server
 compresses the response entity body with the scheme(gzip, deflate) that is specified in the Accept-Encoding request header. When
 the particular header is not present or the header value is "identity", the server does not perform any compression. Compression
 is disabled when the option is set to `COMPRESSION_NEVER` and always enabled when the option is set to `COMPRESSION_ALWAYS`<br/><br/>
 In the same way `http:Client` can be configured as well. For more information on the underlying module, 
 see the [HTTP module](https:docs.central.ballerina.io/ballerina/http/latest/).

```go
import ballerina/http;

// [COMPRESSION_ALWAYS](https://docs.central.ballerina.io/ballerina/http/latest/constants#COMPRESSION_ALWAYS)
// guarantees a compressed response entity body. Compression scheme is set to the
// value indicated in Accept-Encoding request header. When a particular header is not present or the header
// value is "identity", encoding is done using the "gzip" scheme.
// By default, Ballerina compresses any MIME type unless they are mentioned under `contentTypes`.
// Compression can be constrained to certain MIME types by specifying them as an array of MIME types.
// In this example encoding is applied to "text/plain" responses only.
@http:ServiceConfig {
    compression: {
        enable: http:COMPRESSION_ALWAYS,
        contentTypes: ["text/plain"]
    }
}
service / on new http:Listener(9090) {

    // The response entity body is always compressed since MIME type has matched.
    resource function 'default alwaysCompress() returns string {
        return "Type : This is a string";
    }
}
```

#### Output

```go
bal run http_compression.bal
ballerina: started HTTP/WS listener 0.0.0.0:9092
ballerina: started HTTP/WS listener 0.0.0.0:9090
```
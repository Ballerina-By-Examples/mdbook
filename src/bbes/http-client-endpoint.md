# Client

 The HTTP Client Connector can be used to connect to and interact with an HTTP server.<br/><br/>
 For more information on the underlying module, 
 see the [HTTP module](https:docs.central.ballerina.io/ballerina/http/latest/).

```go
import ballerina/http;
import ballerina/io;

public function main() returns error? {
    // Creates a new client with the backend URL.
    final http:Client clientEndpoint = 
                        check new ("http://postman-echo.com");
    
    // Sends a `GET` request to the specified endpoint.
    io:println("GET request:");
    json resp = check clientEndpoint->get("/get?test=123");
    io:println(resp.toJsonString());

    // The `get()`, `head()`, and `options()` have the optional headers parameter to send out headers,
    io:println("\nGET request with Headers:");
    resp = check clientEndpoint->get("/get",
            {"Sample-Name": "http-client-connector"});
    io:println(resp.toJsonString());

    // Sends a `POST` request to the specified endpoint.
    io:println("\nPOST request:");
    resp = check clientEndpoint->post("/post", "POST: Hello World");
    io:println(resp.toJsonString());

    // Uses the `execute()` remote function for custom HTTP verbs.
    io:println("\nUse custom HTTP verbs:");
    http:Response response = check clientEndpoint->execute(
                        "COPY", "/get", "CUSTOM: Hello World");

    io:println("Status code: " + response.statusCode.toString());
}
```

#### Output

```go
bal run http_client_endpoint.bal
GET request:
{"args":{"test":"123"}, "headers":{"x-forwarded-proto":"http", "x-forwarded-port":"80", "host":"postman-echo.com", "x-amzn-trace-id":"Root=1-60b723e3-2cec8477340e121571a5df88", "user-agent":"ballerina"}, "url":"http://postman-echo.com/get?test=123"}

GET request with Headers:
{"args":{}, "headers":{"x-forwarded-proto":"http", "x-forwarded-port":"80", "host":"postman-echo.com", "x-amzn-trace-id":"Root=1-60b723e6-124af9746490533b1a560cca", "sample-name":"http-client-connector", "user-agent":"ballerina"}, "url":"http://postman-echo.com/get"}

POST request:
{"args":{}, "data":"POST: Hello World", "files":{}, "form":{}, "headers":{"x-forwarded-proto":"http", "x-forwarded-port":"80", "host":"postman-echo.com", "x-amzn-trace-id":"Root=1-60b723e6-60ad459c47889ca53a89df90", "content-length":"17", "content-type":"text/plain", "user-agent":"ballerina"}, "json":null, "url":"http://postman-echo.com/post"}

Use custom HTTP verbs:
Status code: 404
```
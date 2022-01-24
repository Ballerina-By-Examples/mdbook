# Request Error Interceptor

 A `RequestErrorInterceptor` is used to handle the errors that occurred in the interceptor pipeline execution. 
 When an error is returned from a `RequestInterceptor` service, the interceptor pipeline execution jumps to the
 nearest `RequestErrorInterceptor`. However, if there is no `RequestErrorInterceptor` in the pipeline, then, 
 the error response is returned to the client without executing the actual resource in the target service.
 For more information, see the [HTTP module](https:docs.central.ballerina.io/ballerina/http/latest/).

```go
import ballerina/http;
import ballerina/io;

// Header name checked by the first request interceptor.
final string interceptor_check_header = "X-requestCheckHeader";

// Header value to be set to the request in the request error interceptor.
final string interceptor_check_header_value = "RequestErrorInterceptor";

service class RequestInterceptor1 {
    *http:RequestInterceptor;

    resource function 'default [string... path](http:RequestContext ctx, 
                            http:Request req) returns http:NextService|error? {
        io:println("Executing Request Interceptor 1");
        // Tries to read the header. This will return a `HeaderNotFoundError` if you do not set this header. Then, the execution will 
        // jump to the nearest `RequestErrorInterceptor`.
        string checkHeader = check req.getHeader(interceptor_check_header);
        io:println("Check Header Value : " + checkHeader);
        return ctx.next();
    }
}

RequestInterceptor1 requestInterceptor1 = new;

service class RequestInterceptor2 {
    *http:RequestInterceptor;

    resource function get [string... path](http:RequestContext ctx) 
            returns http:NextService|error? {
        io:println("Executing Request Interceptor 2");
        return ctx.next();
    }
}

RequestInterceptor2 requestInterceptor2 = new;

// A Request Error Interceptor service class implementation. It intercepts the request when an error occurrs in the interceptor execution,
// and adds a header before it is dispatched to the target HTTP resource. Also, a Request Error Interceptor service class can have only one resource function.
service class RequestErrorInterceptor {
    *http:RequestErrorInterceptor;

    // The resource function inside a `RequestErrorInterceptor` is only allowed to have the default method and path. The error occurred
    // in the interceptor execution can be accessed by the `error` parameter.
    resource function 'default [string... path](http:RequestContext ctx, 
                http:Request req, error err) returns http:NextService|error? {
        io:println("Executing Request Error Interceptor");
        io:println("Error occurred : " + err.message());
        // Sets a header to the request.
        req.setHeader(interceptor_check_header, interceptor_check_header_value);
        return ctx.next();
    }
}

// Creates a new Request Error Interceptor.
RequestErrorInterceptor requestErrorInterceptor = new;

listener http:Listener interceptorListener = new http:Listener(9090, config = { 
    // A `RequestErrorInterceptor` can be added anywhere in the interceptor pipeline.
    interceptors: [requestInterceptor1, requestInterceptor2, 
                   requestErrorInterceptor] 
});

service / on interceptorListener {

    resource function get greeting(http:Request req) 
            returns http:Response|error? {
        io:println("Executing Target Resource");
        // Creates a new response.
        http:Response response = new;
        // Sets the headers from the request.
        response.setHeader(interceptor_check_header, 
                        check req.getHeader(interceptor_check_header));
        response.setTextPayload("Greetings!");
        return response;
    }
}
```

#### Output

```go
# Run the service.
bal run http_request_error_interceptor.bal

Executing Request Interceptor 1
error: Http header does not exist
        at ballerina.http.2:externRequestGetHeader(http_request.bal:733)
           ballerina.http.2.Request:getHeader(http_request.bal:147)
           RequestInterceptor1:$default$**(http_request_error_interceptor.bal:18)
Executing Request Error Interceptor
Error occurred : Http header does not exist
Executing Target Resource
```
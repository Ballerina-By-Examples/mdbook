# 100 Continue

 Convenience functions are provided in the HTTP library for ease of use when handling 100-continue scenarios. 
 100-continue indicates that the server has received the request headers and the client can proceed with sending the request.<br/><br/>
 For more information on the underlying module, 
 see the [HTTP module](https:docs.central.ballerina.io/ballerina/http/latest/).  

```go
import ballerina/http;
import ballerina/log;

service / on new http:Listener(9090) {

    resource function 'default hello(http:Caller caller, http:Request request)
            returns error? {
        // [Check if the client expects a 100-continue response](https://docs.central.ballerina.io/ballerina/http/latest/classes/Request#expects100Continue).
        if (request.expects100Continue()) {
            string mediaType = request.getContentType();
            if (mediaType.toLowerAscii() == "text/plain") {

                // Send a 100-continue response to the client.
                var result = caller->continue();
                if (result is error) {
                    log:printError("Error sending response", 'error = result);
                }

            // Send a 417 response to ignore the payload since content type is mismatched
            // with the expected content type.
            } else {
                http:Response resp = new;
                resp.statusCode = http:STATUS_EXPECTATION_FAILED;
                resp.setPayload("Unprocessable Entity");
                check caller->respond(resp);
            }
        }

        // The client starts sending the payload once it receives the
        // 100-continue response. Retrieve the payload that is sent by the client.
        var payload = request.getTextPayload();
        if (payload is string) {
            log:printInfo(payload);
            check caller->respond("Hello World!\n");
        } else {
            http:Response resp = new;
            resp.statusCode = http:STATUS_INTERNAL_SERVER_ERROR;
            resp.setPayload(payload.message());
            check caller->respond(resp);
        }
    }
}
```

#### Output

```go
bal run http_expect_header.bal
time = 2021-01-21 20:31:28,347 level = INFO  module = "" message = "TEST 100 CONTINUE"
```
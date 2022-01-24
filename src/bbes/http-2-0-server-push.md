# HTTP 2.0 Server Push

 This example demonstrates sending and receiving HTTP/2 Server Push messages in Ballerina HTTP Library. 
 HTTP/2 Server Push messages allow the server to send resources to the client before the client requests for it.<br/><br/>
 For more information on the underlying module, 
 see the [HTTP module](https:docs.central.ballerina.io/ballerina/http/latest/).  

```go
import ballerina/http;
import ballerina/log;

// Create an endpoint with port 7090 to accept HTTP requests.
// HTTP version is set to 2.0.
listener http:Listener http2ServiceEP = new (7090,
    config = {httpVersion: "2.0"});

service /http2Service on http2ServiceEP {

    resource function 'default .(http:Caller caller) {

        // [Send a Push Promise](https://docs.central.ballerina.io/ballerina/http/latest/clients/Caller#promise).
        http:PushPromise promise1 = new (path = "/resource1", method = "GET");
        var promiseResponse1 = caller->promise(promise1);
        if (promiseResponse1 is error) {
            log:printError("Error occurred while sending the promise1",
                'error = promiseResponse1);
        }

        // Send another Push Promise.
        http:PushPromise promise2 = new (path = "/resource2", method = "GET");
        var promiseResponse2 = caller->promise(promise2);
        if (promiseResponse2 is error) {
            log:printError("Error occurred while sending the promise2",
                'error = promiseResponse2);
        }

        // Send one more Push Promise.
        http:PushPromise promise3 = new (path = "/resource3", method = "GET");
        var promiseResponse3 = caller->promise(promise3);
        if (promiseResponse3 is error) {
            log:printError("Error occurred while sending the promise3",
                'error = promiseResponse3);
        }

        // Construct the requested resource.
        http:Response res = new;
        json msg = {"response": {"name": "main resource"}};
        res.setPayload(msg);

        // Send the requested resource.
        var response = caller->respond(res);
        if (response is error) {
            log:printError("Error occurred while sending the response",
                'error = response);
        }

        // Construct promised resource1.
        http:Response push1 = new;
        msg = {"push": {"name": "resource1"}};
        push1.setPayload(msg);

        // [Push promised resource1](https://docs.central.ballerina.io/ballerina/http/latest/clients/Caller#pushPromisedResponse).
        var pushResponse1 = caller->pushPromisedResponse(promise1, push1);
        if (pushResponse1 is error) {
            log:printError("Error occurred while sending the promised " +
                           "response1", 'error = pushResponse1);
        }

        // Construct promised resource2.
        http:Response push2 = new;
        msg = {"push": {"name": "resource2"}};
        push2.setPayload(msg);

        // Push promised resource2.
        var pushResponse2 = caller->pushPromisedResponse(promise2, push2);
        if (pushResponse2 is error) {
            log:printError("Error occurred while sending the promised " +
                            "response2", 'error = pushResponse2);
        }

        // Construct promised resource3.
        http:Response push3 = new;
        msg = {"push": {"name": "resource3"}};
        push3.setPayload(msg);

        // Push promised resource3.
        var pushResponse3 = caller->pushPromisedResponse(promise3, push3);
        if (pushResponse3 is error) {
            log:printError("Error occurred while sending the promised " +
                            "response3", 'error = pushResponse3);
        }
    }
}
```

#### Output

```go
bal run http_2.0_service.bal
```

***

```go
import ballerina/http;
import ballerina/log;

// Create an [HTTP client](https://docs.central.ballerina.io/ballerina/http/latest/clients/Client) that can send HTTP/2 messages.
// HTTP version is set to 2.0.
final http:Client clientEP =
        check new ("http://localhost:7090", {httpVersion: "2.0"});

public function main() {

    http:Request serviceReq = new;
    http:HttpFuture httpFuture = new;
    // [Submit a request](https://docs.central.ballerina.io/ballerina/http/latest/clients/Client#submit).
    var submissionResult = clientEP->submit("GET", "/http2Service", serviceReq);

    if (submissionResult is http:HttpFuture) {
        httpFuture = submissionResult;
    } else {
        log:printError("Error occurred while submitting a request",
            'error = submissionResult);
        return;
    }

    http:PushPromise?[] promises = [];
    int promiseCount = 0;
    // [Check if promises exists](https://docs.central.ballerina.io/ballerina/http/latest/clients/Client#hasPromise).
    boolean hasPromise = clientEP->hasPromise(httpFuture);

    while (hasPromise) {
        http:PushPromise pushPromise = new;
        // [Get the next promise](https://docs.central.ballerina.io/ballerina/http/latest/clients/Client#getNextPromise).
        var nextPromiseResult = clientEP->getNextPromise(httpFuture);

        if (nextPromiseResult is http:PushPromise) {
            pushPromise = nextPromiseResult;
        } else {
            log:printError("Error occurred while fetching a push promise",
                'error = nextPromiseResult);
            return;
        }
        log:printInfo("Received a promise for " + pushPromise.path);

        if (pushPromise.path == "/resource2") {
            // The client is not interested in receiving `/resource2`.
            // Therefore, [reject the promise](https://docs.central.ballerina.io/ballerina/http/latest/clients/Client#rejectPromise).
            clientEP->rejectPromise(pushPromise);

            log:printInfo("Push promise for resource2 rejected");
        } else {
            // Store the required promises.
            promises[promiseCount] = pushPromise;

            promiseCount = promiseCount + 1;
        }
        hasPromise = clientEP->hasPromise(httpFuture);
    }

    http:Response response = new;
    // [Get the requested resource](https://docs.central.ballerina.io/ballerina/http/latest/clients/Client#getResponse).
    var result = clientEP->getResponse(httpFuture);

    if (result is http:Response) {
        response = result;
    } else {
        log:printError("Error occurred while fetching response",
                'error = <error>result);
        return;
    }

    var responsePayload = response.getJsonPayload();
    if (responsePayload is json) {
        log:printInfo("Response : " + responsePayload.toJsonString());
    } else {
        log:printError("Expected response payload not received",
          'error = responsePayload);
    }

    // Fetch required promise responses.
    foreach var p in promises {
        http:PushPromise promise = <http:PushPromise>p;
        http:Response promisedResponse = new;
        var promisedResponseResult = clientEP->getPromisedResponse(promise);
        if (promisedResponseResult is http:Response) {
            promisedResponse = promisedResponseResult;
        } else {
            log:printError("Error occurred while fetching promised response",
                'error = promisedResponseResult);
            return;
        }
        var promisedPayload = promisedResponse.getJsonPayload();
        if (promisedPayload is json) {
            log:printInfo("Promised resource : " +
                           promisedPayload.toJsonString());
        } else {
            log:printError("Expected promised response payload not received",
                'error = promisedPayload);
        }
    }
}
```

#### Output

```go
bal run http_client.bal
time = 2021-01-21 18:54:45,237 level = INFO  module = "" message = "Received a promise for /resource1"
time = 2021-01-21 18:54:45,278 level = INFO  module = "" message = "Received a promise for /resource2"
time = 2021-01-21 18:54:45,281 level = INFO  module = "" message = "Push promise for resource2 rejected"
time = 2021-01-21 18:54:45,283 level = INFO  module = "" message = "Received a promise for /resource3"
time = 2021-01-21 18:54:45,306 level = INFO  module = "" message = "Response : {"response":{"name":"main resource"}}"
time = 2021-01-21 18:54:45,314 level = INFO  module = "" message = "Promised resource : {"push":{"name":"resource1"}}"
time = 2021-01-21 18:54:45,468 level = INFO  module = "" message = "Promised resource : {"push":{"name":"resource3"}}"
```
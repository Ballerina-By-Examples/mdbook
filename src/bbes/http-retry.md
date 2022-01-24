# Retry

 The HTTP retry client tries sending over the same request to the backend service when there is a network level failure.<br/><br/>
 For more information on the underlying module, 
 see the [HTTP module](https:docs.central.ballerina.io/ballerina/http/latest/).

```go
import ballerina/http;
import ballerina/log;
import ballerina/lang.runtime;

http:Client backendClientEP = check new ("http://localhost:8080", {
            // Retry configuration options.
            retryConfig: {

                // Initial retry interval in seconds.
                interval: 3,

                // Number of retry attempts before giving up.
                count: 3,

                // Multiplier of the retry interval to exponentially increase
                // the retry interval.
                backOffFactor: 2.0,

                // Upper limit of the retry interval in seconds. If
                // `interval` into `backOffFactor` value exceeded
                // `maxWaitInterval` interval value,
                // `maxWaitInterval` will be considered as the retry
                // interval.
                maxWaitInterval: 20

            },
            timeout: 2
        }
    );


service / on new http:Listener(9090) {
    resource function 'default 'retry() returns string|error {
        string payload = check backendClientEP->get("/hello");
        return payload;
    }
}


// This sample service is used to mock connection timeouts and service outages.
// The service outage is mocked by stopping/starting this service.
// This should run separately from the `retry` service.
service / on new http:Listener(8080) {
    private int counter = 0;

    resource function get hello() returns string {
        self.counter += 1;
        // Delay the response by 5 seconds to mimic network level delays.
        if (self.counter % 4 != 0) {
            log:printInfo(
                "Request received from the client to delayed service.");
            runtime:sleep(5);

            return "Hello World!!!";
        } else {
            log:printInfo(
                "Request received from the client to healthy service.");
            return "Hello World!!!";
        }
    }
}
```

#### Output

```go
bal run http_retry.bal.bal
time = 2021-01-21 19:00:21,374 level = INFO  module = "" message = "Request received from the client to delayed service."
time = 2021-01-21 19:00:26,379 level = INFO  module = "" message = "Request received from the client to delayed service."
time = 2021-01-21 19:00:34,402 level = INFO  module = "" message = "Request received from the client to delayed service."
time = 2021-01-21 19:00:48,404 level = INFO  module = "" message = "Request received from the client to healthy service."
```
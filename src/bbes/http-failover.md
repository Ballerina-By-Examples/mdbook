# Failover

 Ballerina users can configure multiple HTTP clients in a given failover group. 
 If one of the HTTP clients (dependencies) fails, Ballerina automatically fails over to another endpoint.
 The following example depicts the `FailoverClient` behaviour with three target services. The first two targets
 are configured to mimic failure backends.
 After the first invocation the client resumes the failover from the last successful target. In this case it is
 the third target and the client will get the immediate response for subsequent calls.<br/><br/>
 For more information on the underlying module, 
 see the [HTTP module](https:docs.central.ballerina.io/ballerina/http/latest/).

```go
import ballerina/http;
import ballerina/lang.runtime;

// Define the failover client endpoint to call the backend services.
http:FailoverClient foBackendEP = check new ({

    timeout: 5,
    failoverCodes: [501, 502, 503],
    interval: 5,
    // Define a set of HTTP Clients that are targeted for failover.
    targets: [
            {url: "http://nonexistentEP/mock1"},
            {url: "http://localhost:8080/echo"},
            {url: "http://localhost:8080/mock"}
        ]
});

service / on new http:Listener(9090) {
    resource function 'default fo() returns string|error {
        string payload = check foBackendEP->get("/");
        return payload;
    }
}

// Define the sample service to mock connection timeouts and service outages.
service / on new http:Listener(8080) {
    resource function 'default echo() returns string {

        // Delay the response for 30 seconds to mimic network level delays.
        runtime:sleep(30);
        return "echo Resource is invoked";
    }

    // Define the sample resource to mock a healthy service.
    resource function 'default mock() returns string {
        return "Mock Resource is Invoked.";
    }
}
```

#### Output

```go
bal run http_failover.bal
```
# Load Balancer

 An HTTP load balancing endpoint is used when the request load needs to be load balanced across a given 
 set of target endpoints.<br/><br/>
 For more information on the underlying module, 
 see the [HTTP module](https:docs.central.ballerina.io/ballerina/http/latest/).

```go
import ballerina/http;

// Create an endpoint with port 8080 for the mock backend services.
listener http:Listener backendEP = check new (8080);

// Define the load balance client endpoint to call the backend services.
final http:LoadBalanceClient lbBackendEP = check new ({
        // Define the set of HTTP clients that need to be load balanced.
        targets: [
            {url: "http://localhost:8080/mock1"},
            {url: "http://localhost:8080/mock2"},
            {url: "http://localhost:8080/mock3"}
        ],

        timeout: 5
});

service / on new http:Listener(9090) {
    resource function 'default lb() returns string|error {
        string payload = check lbBackendEP->get("/");
        return payload;
    }
}

// Define the mock backend services, which are called by the load balancer.
service /mock1 on backendEP {
    resource function get .() returns string {
        return "Mock1 resource was invoked.";
    }
}

service /mock2 on backendEP {
    resource function get .() returns string {
        return "Mock2 resource was invoked.";
    }
}

service /mock3 on backendEP {
    resource function get .() returns string {
        return "Mock3 resource was invoked.";
    }
}
```

#### Output

```go
bal run http_load_balancer.bal
```
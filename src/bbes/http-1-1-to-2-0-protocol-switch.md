# HTTP 1.1 to 2.0 Protocol Switch

 In this example, the Ballerina HTTP service receives a message over the HTTP/1.1 protocol and forwards it 
 to another service over the HTTP/2.0 protocol.<br/><br/>
 For more information on the underlying module, 
 see the [HTTP module](https:docs.central.ballerina.io/ballerina/http/latest/).  

```go
import ballerina/http;

// HTTP version is set to 2.0.
http:Client http2serviceClientEP =
        check new ("http://localhost:7090", {httpVersion: "2.0"});

service / on new http:Listener(9090) {

    resource function 'default http11Service(http:Request clientRequest)
            returns json|error {
        // Forward the [clientRequest](https://docs.central.ballerina.io/ballerina/http/latest/classes/Request) to the `http2` service.
        json clientResponse = check
            http2serviceClientEP->forward("/http2service", clientRequest);

        // Send the response back to the caller.
        return clientResponse;

    }
}

// HTTP version is set to 2.0.
listener http:Listener http2serviceEP = new (7090,
    config = {httpVersion: "2.0"});

service / on http2serviceEP {

    resource function 'default http2service() returns json {
        // Send the response back to the caller (http11Service).
        return { 
            "response": {
                "message":"response from http2 service"
            }
        };
    }
}
```

#### Output

```go
bal run http_1_1_to_2_0_protocol_switch.bal
```
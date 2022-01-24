# Hello World Service

 Let's write a simple HTTP service in Ballerina. 
 This example demonstrates the network primitives in the language that make it simpler to develop services.

```go
import ballerina/http;

service / on new http:Listener(9090) {

    // This function responds with `string` value `Hello, World!` to HTTP GET requests.
    resource function get greeting() returns string {
        return "Hello, World!";
    }

}
```

#### Output

```go
bal run hello_world_service.bal
```
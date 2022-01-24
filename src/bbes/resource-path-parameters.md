# Resource Path Parameters

 Path segments can be treated as parameters in Ballerina.

```go
import ballerina/http;

service /demo on new http:Listener(8080) {
    // Here is how you can make path segments as parameters.
    resource function get greeting/hello/[string name]() returns string {

        return "Hello, " + name;
    }
}
```

#### Output

```go
bal run resource_path_parameters.bal
```
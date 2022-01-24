# Resource Methods

 Service objects use `remote` methods to expose services in procedural style: remote methods are named by verbs. <br/><br/>
 Service objects use `resource` methods to expose services in an RESTful style: resources are named by nouns. <br/><br/>
 Resources are motivated by HTTP, but are general enough also to work for GraphQL. 
 `resource` methods are a network-oriented generalization of OO getter/setter concept.

```go
import ballerina/http;

// Service declaration specifies base path for the resource names. The base path is `/` in this example.
service / on new http:Listener(8080) {
    // Resource method is associated with combination of accessor (`get`) and resource name (`hello`). 
    // Accessors are determined by the network protocol.
    // In HTTP resources, function parameters come from query parameters.
    resource function get hello(string name) returns string {
        return "Hello, " + name;
    }

}
```

#### Output

```go
bal run resource_methods.bal
```
# Resource Method Typing

 Resource method arguments can use user-defined types.
 Listener will use introspection to map from protocol format 
 (typically JSON) to user-defined type, using `cloneWithType`.
 Return value that is subtype of `anydata` will be mapped from 
 user-defined type to protocol format, typically JSON, using `toJson`.
 Can generate API description (e.g. OpenAPI) from Ballerina 
 service declaration.
 Annotations can be used to refine the mapping between 
 Ballerina-declared type and wire format.

```go
import ballerina/http;

type Args record {|
    decimal x;
    decimal y;
|};

listener http:Listener h = new (9090);

service /calc on h {
    // Resource method arguments can use user-defined types.
    // Annotations can be used to refine the mapping between 
    // Ballerina-declared type and wire format.
    resource function post add(@http:Payload Args args) 
            returns decimal {
        return args.x + args.y;
    }

}
```

#### Output

```go
bal run resource_method_typing.bal
```
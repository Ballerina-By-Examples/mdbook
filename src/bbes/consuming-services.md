# Consuming Services: Client Objects

 Ballerina has a language construct called client objects. 
 They are a special kind of objects that contain `remote` methods in addition to regular methods. 
 `remote` methods are used to interact with a remote service. 
 Applications typically do not need to write client classes, which are either provided by library modules or generated from some flavor of IDL.

```go
import ballerina/http;
import ballerina/io;

public function main() returns error? {
    // A client object is created by applying `new` to a client class.
    http:Client httpClient = check new ("https://api.github.com/");

    // The remote method calls use the `->` syntax. This enables the sequence diagram view.
    http:Response resp =
                    check httpClient->get("/orgs/ballerina-platform/repos");

    io:println(resp.statusCode);
}
```

#### Output

```go
bal run consuming_services.bal
200
```
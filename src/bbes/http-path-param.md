# Path Parameter

 HTTP module provides first class support for specifying `Path parameters` in the resource path along with the type.
 The supported types are string, int, float, boolean, and decimal (e.g., path/[string foo]).<br/><br/>
 For more information on the underlying module, 
 see the [HTTP module](https:docs.central.ballerina.io/ballerina/http/latest/).

```go
import ballerina/http;

service /company on new http:Listener(9090) {

    // The path param is defined as a part of the resource path along with the type and it is extracted from the
    // request URI.
    resource function get empId/[int id]() returns json {
        return {empId: id};
    }

    resource function get empName/[string first]/[string last]() returns json {
        return {firstName: first, lastName: last};
    }
}
```

#### Output

```go
bal run http_path_param.bal
```
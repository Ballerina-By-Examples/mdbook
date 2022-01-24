# Query Parameter

 HTTP module provides first class support for reading URL query parameters as resource method argument.
 The supported types are string, int, float, boolean, decimal, and the array types of the aforementioned types. The
 query param type can be nilable (e.g., (string? bar)). The request also provide certain method to retrieve query
 param at their convenience <br/><br/>
 For more information on the underlying module, 
 see the [HTTP module](https:docs.central.ballerina.io/ballerina/http/latest/).

```go
import ballerina/http;

service /product on new http:Listener(9090) {

    // The `a`, `b` method arguments are considered as query parameters.
    resource function get count(int a, int b) returns json {
        return { count : a + b};
    }

    // The query param type is nilable which means the URI may contain the param.
    // In the absence of the query param `id` the type is nil.
    resource function get name(string? id) returns string {
        if (id is string) {
            return "product_" + id;
        }
        return "product_0000";
    }

    // The multiple query param values also can be accommodate to an array.
    resource function get detail(string[]? colour) returns json {
        return { product_colour : colour};
    }
}
```

#### Output

```go
bal run http_query_parameter.bal
```
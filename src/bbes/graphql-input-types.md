# Input Types

 GraphQL resources can have input parameters, which will be mapped to input
 values in the generated GraphQL schema. Currently, the supported input types
 are: `string`, `int`, `boolean`, `float`, and `enum`. Any of these types can
 be an optional and/or defaultable types.<br/><br/>
 For more information on the underlying package, see the
 [`graphql` package](https:docs.central.ballerina.io/ballerina/graphql/latest/).

```go
import ballerina/graphql;

service /graphql on new graphql:Listener(4000) {

    // The input parameters in a resource function becomes input values of the
    // corresponding GraphQL field. In this GraphQL schema, the 
    // `greeting` field of `Query` type  has a `name`  input value, which accepts
    // `string` values.
    resource function get greeting(string name) returns string {

        return string`Hello, ${name}`;
    }
}
```

#### Output

```go
bal run graphql_input_types.bal
```
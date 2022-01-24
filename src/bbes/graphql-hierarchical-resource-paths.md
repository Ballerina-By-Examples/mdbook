# Hierarchical Resource Paths

 The resources in Ballerina GraphQL services can have hierarchical resource
 paths. When a hierarchical path is present, an `OBJECT` type is created for
 each intermediate path segment with the same name. Every sub path under a
 path segment will be added as a field of the created type.<br/><br/>
 For more information on the underlying package, see the
 [`graphql` package](https:docs.central.ballerina.io/ballerina/graphql/latest/).<br/><br/>
 This example shows a GraphQL endpoint, which has a `profile` field of type `Person`.
 A GraphQL client can query this service to retrieve specific fields or subfields of the `Person` object.

```go
import ballerina/graphql;

// This service has multiple resources with hierarchical resource paths.
// The root operation has a field named `profile` and it is the first segment
// of the hierarchical path in this service. The type of this field will also
// be `profile`. (For hierarchical paths, the field name and the type name will
// be the same). The `profile` type has two fields: `quote` and `name`. The
// type of the `quote` field is `String` and the type of the `name` field is
// `name`. The `name` type has two fields:`first` and the `last`. Both of the
// fields are of type `String`.
service /graphql on new graphql:Listener(4000) {

    // This resource represents the `quote` field under the `profile` object.
    resource function get profile/quote() returns string {
        return "I am the one who knocks!";
    }

    // This resource represents the `first` field under the `name` object type.
    // The `name` field in the `profile` object is of type `name`.
    resource function get profile/name/first() returns string {
        return "Walter";
    }

    // This resource represents the `last` field under the `name` object type.
    // The `name` field in the `profile` object is of type `name`.
    resource function get profile/name/last() returns string {
        return "White";
    }
}
```

#### Output

```go
bal run graphql_hierarchical_resource_paths.bal
```
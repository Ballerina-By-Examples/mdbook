# Returning Record Values

 In Ballerina GraphQL, a service represents the GraphQL endpoint.
 Each resource function inside the service represents a resolver function for a field in the root Query type.<br/><br/>
 For more information on the underlying package, see the
 [GraphQL package](https:docs.central.ballerina.io/ballerina/graphql/latest/).<br/><br/>
 This example shows a GraphQL endpoint, which has a field `profile` of type `Person`.
 A GraphQL client can query on this service to retrieve specific fields or subfields of the `Person` object.


```go
import ballerina/graphql;

service /graphql on new graphql:Listener(4000) {

    // Ballerina GraphQL resolvers can return `record` values. The record will be mapped to an `OBJECT` type.
    resource function get profile() returns Person {

        return {
            name: "Walter White",
            age: 51,
            address: {
                number: "308",
                street: "Negra Arroyo Lane",
                city: "Albuquerque"
            }
        };
    }
}

// Define the custom record types for the returning data.
public type Person record {
    string name;
    int age;
    Address address;
};
public type Address record {
    string number;
    string street;
    string city;
};
```

#### Output

```go
bal run graphql_returning_record_values.bal
```
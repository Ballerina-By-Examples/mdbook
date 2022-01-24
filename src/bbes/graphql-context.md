# Context

 The `graphql:Context` object can be used to pass meta information between the resolver functions. An init function
 should be provided using the `graphql:ServiceConfig` parameter named `contextInit`. Inside the init function, the
 `graphql:Context` can be initialized. Values from the `http:RequestContext` and `http:Request` can be added as well as
 other values. These values are stored as key-value pairs. The key is a `string` and the value can be any `readonly`
 value or an `isolated` object. If the init function is not provided, an empty context object will be created.
 The context can be accessed by defining it as the first parameter of any resolver (resource/remote) function.
 <br/><br/>
 For more information on the underlying package, see the
 [`graphql` package](https:docs.central.ballerina.io/ballerina/graphql/latest/).

```go
import ballerina/graphql;
import ballerina/http;
import ballerina/lang.value;

@graphql:ServiceConfig {
    // Initialization of the `graphqlContext` should be provided to the
    // `contextInit` field.
    contextInit: isolated function (http:RequestContext requestContext,
                                    http:Request request)
                                    returns graphql:Context|error {

        // Initialize the `graphql:Context` object.
        graphql:Context context = new;

        // Retrieve the header named `scope` and add it to the context with the
        // `scope` key. If the header does not exist, this will return an
        // `error`, and thereby, the request will not be processed.
        check context.add("scope", check request.getHeader("scope"));

        // Finally, the context object has to be returned.
        return context;

    }
}
service /graphql on new graphql:Listener(4000) {

    // Define a `Person` object when the service is initialized.
    private final Person person;

    function init() {
        // Initialize the `person` value.
        self.person = new("Walter White", 51, 737000.00);

    }

    // Resource functions can be defined without a context parameter.
    resource function get greet() returns string {
        return "Hello, world";
    }

    // If the context is needed, it should be defined as the first paramter of
    // the resolver function.
    resource function get profile(graphql:Context context)
    returns Person|error {

        // Retrieve the `scope` attribute from the context. This will return
        // a `graphql:Error` if the `scope` is not
        // found in the context.
        value:Cloneable|isolated object {} scope = check context.get("scope");

        // The profile information will be returned for the scope of either
        // `admin` or `user`.
        if scope is string {
            if scope == "admin" || scope == "user" {
                return self.person;
            }
        }

        // Return an `error` if the required scope is not found.
        return error("Permission denied");
    }
}

// Define a service class to use as an object in the GraphQL service.
public service class Person {

    private final string name;
    private final int age;
    private final float salary;

    function init(string name, int age, float salary) {
        self.name = name;
        self.age = age;
        self.salary = salary;
    }

    resource function get name() returns string {
        return self.name;
    }

    resource function get age() returns int {
        return self.age;
    }

    resource function get salary(graphql:Context context) returns float|error {

        // Retrieve the `scope` attribute from the context.
        value:Cloneable|isolated object {} scope = check context.get("scope");

        // The `salary` value will only be returned if the `scope` is `admin`.
        if scope is string {
            if scope == "admin" {
                return self.salary;
            }
        }

        // Return an `error` if the required scope is not found.
        return error("Permission denied");

    }
}
```

#### Output

```go
bal run graphql_context.bal
```
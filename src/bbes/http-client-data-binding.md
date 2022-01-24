# Client Data Binding

 Through client data binding, the response payload can be accessed directly. The payload type is inferred from the
 contextually-expected type or from the `targetType` argument. A possible payload type out of `string`|`xml`|`json`|
 `map<json>`|`byte[]`|`record`|`record[]` and `http:Response` is expected as return value type.
 When the user expects client data binding to happen, the HTTP error responses (4XX, 5XX) will be categorized
 as an `error` (`http:ClientRequestError`, `http:RemoteServerError`) of the client remote operation.
 For more information on the underlying module,
 see the [HTTP module](https:docs.central.ballerina.io/ballerina/http/latest/).

```go
import ballerina/http;
import ballerina/log;

type Person record {|
    string name;
    int age;
|};

http:Client backendClient = check new("http://localhost:9092");

service /call on new http:Listener(9090) {

    resource function get all() returns json|error {
        // Binding the payload to a string type. The `targetType` is inferred from the LHS variable type.
        string result = check backendClient->get("/backend/string");
        log:printInfo("String payload: " + result);

        // A `record` and `record[]` are also possible types for data binding.
        Person person = check backendClient->get("/backend/person");
        log:printInfo("Person name: " + person.name);
        return person;
    }

    // When the data binding is expected to happen and if the `post` remote function gets a 5XX response from the
    // backend, the response will be returned as an [http:RemoteServerError](https://docs.central.ballerina.io/ballerina/http/latest/errors#RemoteServerError)
    // including the error payload, headers, and status code.
    resource function get '5xx() returns json {
        json|error res = backendClient->post("/backend/5XX", "want 500");
        if (res is http:RemoteServerError) {
            http:Detail detail = res.detail();
            return { code:detail.statusCode, payload:<string>detail.body};
        } else {
            return { code: "invalid" };
        }
    }

    // When the data binding is expected to happen and if the client remote function gets a 4XX response from the
    // backend, the response will be returned as an [http:ClientRequestError](https://docs.central.ballerina.io/ballerina/http/latest/errors#ClientRequestError)
    // including the error payload, headers, and status code.
    resource function get '4xx() returns json {
        json|error res = backendClient->post("/backend/err", "want 400");
        if (res is http:ClientRequestError) {
            http:Detail detail = res.detail();
            return { code:detail.statusCode, payload:<string>detail.body};
        } else {
            return { code: "invalid" };
        }
    }
}

service /backend on new http:Listener(9092) {

    resource function get 'string() returns string {
        return "Hello ballerina!!!!";
    }

    resource function get person() returns record {|*http:Ok; Person body;|} {
        return {body: {name: "Smith", age: 15}};
    }

    resource function post '5XX() returns http:NotImplemented {
        return {body:"data-binding-failed-with-501"};
    }
}
```

#### Output

```go
bal run http_client_data_binding.bal
time = 2021-01-21 19:29:10,007 level = INFO  module = "" message = "String payload: Hello ballerina!!!!"
time = 2021-01-21 19:29:10,092 level = INFO  module = "" message = "Person name: Smith"
```
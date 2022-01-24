# Header Parameter

 The `http` module provides support for accessing inbound request headers as resource method arguments.
 The header key can be specified as a variable name along with the `@http:Header` annotation. Else, it can be specified
 in the `name` field of the annotation. The supported types are `string`, `string[]`, and optional.
 The `string[]` type returns all the values for a given header key while `string` returns the first value. Unless the
 type is optional, the request will be responded with a 400 Bad request in the absence of the mentioned header.
 However, more header manipulations can be done via the `http:Headers` header object, which also can be accessed as
 a resource method argument without using the annotation.<br/><br/>
 For more information on the underlying module,
 see the [HTTP module](https:docs.central.ballerina.io/ballerina/http/latest/).

```go
import ballerina/http;
import ballerina/log;

service / on new http:Listener(9090) {
    // The `clientKey` method argument is considered as the value for the
    // `X-Client-Key` HTTP header.
    resource function get hello(@http:Header {name: "X-Client-Key"}
            string clientKey) returns string {

        log:printInfo("Received header value: " + clientKey);
        return clientKey;
    }
}
```

#### Output

```go
bal run http_headers.bal
time = 2021-06-25T11:56:13.746+05:30 level = INFO module = "" message = "Received header value 0987654321"
```
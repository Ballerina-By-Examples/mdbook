# Typed Resource Responses

 The resource method can return `anydata` type, an `http:Response` object, `StatusCodeResponse` records along with
 `error?`. Instead of using an `http:Caller`, the response can be sent similarly by returning from the method.
 When returning `anydata`, the `@http:Payload` annotation can be used to specify the `Content-type` of the response
 additionally. Otherwise, the default content type of the respective return value type will be added.
 For more information on the underlying module, 
 see the [HTTP module](https:docs.central.ballerina.io/ballerina/http/latest/).

```go
import ballerina/http;

type PersonAccount record {
    string name;
    int accountNo;
};

service /bank on new http:Listener(9090) {

    // The resource returns the json type values and the `Content-type` header is set according to the `mediaType`
    // field of [@http:Payload](https://docs.central.ballerina.io/ballerina/http/latest/records/HttpPayload)
    // annotation.
    resource function get branch() returns
            @http:Payload {mediaType:"application/json+id"} json {
        return { branch : ["Colombo, Srilanka"]};
    }

    // The [StatusCodeResponse](https://docs.central.ballerina.io/ballerina/http/latest/types#StatusCodeResponse)
    // can be state as return type to send responses with specific HTTP status codes.
    resource function get [string 'type]()
            returns http:Ok|http:InternalServerError {
        if 'type == "open" {

            // Creates response with 200 status code and set body as response payload.
            http:Ok ok = {body: "Bank is open"};
            return ok;
        } else {

            // Creates response with 500 status code and set body as response payload.
            http:InternalServerError err = {body: "Bank is closed"};
            return err;
        }
    }

    // Inline response records are useful to return headers and body along with status code. In this instance the
    // return type is a subtype of [http:Created](https://docs.central.ballerina.io/ballerina/http/latest/records/Created)
    // record, hence 201 response will be sent.
    resource function put account(@http:Payload string name)
            returns record {|*http:Created; PersonAccount body;|} {
        PersonAccount account = {accountNo: 84230, name: name};
        return {
            mediaType: "application/account+json",
            headers: {
                "Location": "/myServer/084230"
            },
            body: account
        };
    }
}
```

#### Output

```go
bal run http_resource_returns.bal
```
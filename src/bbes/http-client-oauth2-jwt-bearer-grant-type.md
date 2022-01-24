# Client - OAuth2 JWT Bearer Grant Type

 A client, which is secured with an OAuth2 JWT bearer grant type can be
 used to connect to a secured service.<br/>
 The client is enriched with the `Authorization: Bearer <token>` header by
 passing the `http:OAuth2JwtBearerGrantConfig` to the `auth`
 configuration of the client.<br/><br/>
 For more information on the underlying module,
 see the [OAuth2 module](https:docs.central.ballerina.io/ballerina/oauth2/latest/).

```go
import ballerina/http;
import ballerina/io;

// Defines the HTTP client to call the OAuth2 secured APIs.
// The client is enriched with the `Authorization: Bearer <token>` header by
// passing the [`http:OAuth2JwtBearerGrantConfig`](https://docs.central.ballerina.io/ballerina/http/latest/records/OAuth2JwtBearerGrantConfig) for the `auth` configuration of the
// client.
http:Client securedEP = check new("https://localhost:9090",
    auth = {
        tokenUrl: "https://localhost:9445/oauth2/token",
        assertion: "eyJhbGciOiJFUzI1NiIsImtpZCI6Ij[...omitted for brevity...]",
        clientId: "FlfJYKBD2c925h4lkycqNZlC2l4a",
        clientSecret: "PJz0UhTJMrHOo68QQNpvnqAY_3Aa",
        scopes: ["admin"],
        clientConfig: {
            secureSocket: {
                cert: "../resource/path/to/public.crt"
            }
        }
    },
    secureSocket = {
        cert: "../resource/path/to/public.crt"
    }
);

public function main() returns error? {
    string response = check securedEP->get("/foo/bar");
    io:println(response);
}
```

#### Output

```go
# As a prerequisite, start a sample service secured with OAuth2.
# You may need to change the trusted certificate file path.
bal run http_client_oauth2_jwt_bearer_grant_type.bal
Hello, World!
```
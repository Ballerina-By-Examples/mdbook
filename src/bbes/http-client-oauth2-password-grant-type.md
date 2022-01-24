# Client - OAuth2 Password Grant Type

 A client, which is secured with OAuth2 password grant type can be used to
 connect to a secured service.<br/>
 The client is enriched with the `Authorization: Bearer <token>` header by
 passing the `http:OAuth2PasswordGrantConfig` to the `auth` configuration of
 the client.<br/><br/>
 For more information on the underlying module,
 see the [OAuth2 module](https:docs.central.ballerina.io/ballerina/oauth2/latest/).

```go
import ballerina/http;
import ballerina/io;

// Defines the HTTP client to call the OAuth2 secured APIs.
// The client is enriched with the `Authorization: Bearer <token>` header by
// passing the [`http:OAuth2PasswordGrantConfig`](https://docs.central.ballerina.io/ballerina/http/latest/records/OAuth2PasswordGrantConfig) to the `auth` configuration of the
// client.
http:Client securedEP = check new("https://localhost:9090",
    auth = {
        tokenUrl: "https://localhost:9445/oauth2/token",
        username: "admin",
        password: "admin",
        clientId: "FlfJYKBD2c925h4lkycqNZlC2l4a",
        clientSecret: "PJz0UhTJMrHOo68QQNpvnqAY_3Aa",
        scopes: ["admin"],
        refreshConfig: {
            refreshUrl: "https://localhost:9445/oauth2/token",
            scopes: ["hello"],
            clientConfig: {
                secureSocket: {
                    cert: "../resource/path/to/public.crt"
                }
            }
        },
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
bal run http_client_oauth2_password_grant_type.bal
Hello, World!
```
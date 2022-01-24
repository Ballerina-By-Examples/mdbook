# Client - OAuth2 Password Grant Type

 A client, which is secured with OAuth2 password grant type can be used to
 connect to a secured service.<br/>
 The client is enriched with the `Authorization: Bearer <token>` header by
 passing the `websocket:OAuth2PasswordGrantConfig` to the `auth` configuration of
 the client.<br/><br/>
 For more information on the underlying module,
 see the [OAuth2 module](https:docs.central.ballerina.io/ballerina/oauth2/latest/).

```go
import ballerina/io;
import ballerina/websocket;

// Defines the WebSocket client to call the OAuth2 secured APIs.
// The client is enriched with the `Authorization: Bearer <token>` header by
// passing the [`websocket:OAuth2PasswordGrantConfig`](https://docs.central.ballerina.io/ballerina/websocket/latest/records/OAuth2PasswordGrantConfig) to the `auth` configuration of the
// client.
websocket:Client securedEP = check new("wss://localhost:9090/foo/bar",
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
    check securedEP->writeTextMessage("Hello, World!");
    string textMessage = check securedEP->readTextMessage();
    io:println(textMessage);
}
```

#### Output

```go
# As a prerequisite, start a sample service secured with OAuth2.
# You may need to change the trusted certificate file path.
bal run websocket_client_oauth2_password_grant_type.bal
Hello, World!
```
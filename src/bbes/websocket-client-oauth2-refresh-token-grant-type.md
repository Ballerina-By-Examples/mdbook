# Client - OAuth2 Refresh Token Grant Type

 A client, which is secured with an OAuth2 refresh token grant type can be
 used to connect to a secured service.<br/>
 The client is enriched with the `Authorization: Bearer <token>` header by
 passing the `websocket:OAuth2RefreshTokenGrantConfig` to the `auth`
 configuration of the client.<br/><br/>
 For more information on the underlying module,
 see the [OAuth2 module](https:docs.central.ballerina.io/ballerina/oauth2/latest/).

```go
import ballerina/io;
import ballerina/websocket;

// Defines the WebSocket client to call the OAuth2 secured APIs.
// The client is enriched with the `Authorization: Bearer <token>` header by
// passing the [`websocket:OAuth2RefreshTokenGrantConfig`](https://docs.central.ballerina.io/ballerina/websocket/latest/records/OAuth2RefreshTokenGrantConfig) for the `auth` configuration of the
// client.
websocket:Client securedEP = check new("wss://localhost:9090/foo/bar",
    auth = {
        refreshUrl: "https://localhost:9445/oauth2/token",
        refreshToken: "24f19603-8565-4b5f-a036-88a945e1f272",
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
    check securedEP->writeTextMessage("Hello, World!");
    string textMessage = check securedEP->readTextMessage();
    io:println(textMessage);
}
```

#### Output

```go
# As a prerequisite, start a sample service secured with OAuth2.
# You may need to change the trusted certificate file path.
bal run websocket_client_oauth2_refresh_token_grant_type.bal
Hello, World!
```
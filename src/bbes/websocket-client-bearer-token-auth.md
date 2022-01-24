# Client - Bearer Token Auth

 A client, which is secured with Bearer token auth can be used to connect to
 a secured service.<br/>
 The client is enriched with the `Authorization: Bearer <token>` header by
 passing the `websocket:BearerTokenConfig` for the `auth` configuration of the
 client.

```go
import ballerina/io;
import ballerina/websocket;

// Defines the WebSocket client to call the secured APIs.
// The client is enriched with the `Authorization: Bearer <token>` header by
// passing the [`websocket:BearerTokenConfig`](https://docs.central.ballerina.io/ballerina/websocket/latest/records/BearerTokenConfig) for the `auth` configuration of the
// client.
websocket:Client securedEP = check new("wss://localhost:9090/foo/bar",
    auth = {
        token: "56ede317-4511-44b4-8579-a08f094ee8c5"
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
# As a prerequisite, start a secured sample service.
# You may need to change the trusted certificate file path.
bal run websocket_client_bearer_token_auth.bal
Hello, World!
```
# Client - Basic Auth

 A client, which is secured with Basic auth can be used to connect to
 a secured service.<br/>
 The client is enriched with the `Authorization: Basic <token>` header by
 passing the `websocket:CredentialsConfig` for the `auth` configuration of the
 client.<br/><br/>
 For more information on the underlying module,
 see the [Auth module](https:docs.central.ballerina.io/ballerina/auth/latest/).

```go
import ballerina/io;
import ballerina/websocket;

// Defines the WebSocket client to call the Basic auth secured APIs.
// The client is enriched with the `Authorization: Basic <token>` header by
// passing the [`websocket:CredentialsConfig`](https://docs.central.ballerina.io/ballerina/websocket/latest/records/CredentialsConfig) for the `auth` configuration of the
// client.
websocket:Client securedEP = check new("wss://localhost:9090/foo/bar",
    auth = {
        username: "ldclakmal",
        password: "ldclakmal@123"
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
# As a prerequisite, start a sample echo WebSocket service secured with Basic Auth.
# You may need to change the trusted certificate file path.
bal run websocket_client_basic_auth.bal
Hello, World!
```
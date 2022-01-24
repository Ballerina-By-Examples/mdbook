# Client - Self Signed JWT Auth

 A client, which is secured with self-signed JWT can be used to connect to
 a secured service.<br/>
 The client is enriched with the `Authorization: Bearer <token>` header by
 passing the `websocket:JwtIssuerConfig` to the `auth` configuration of the
 client. A self-signed JWT is issued before the request is sent.<br/><br/>
 For more information on the underlying module,
 see the [OAuth2 module](https:docs.central.ballerina.io/ballerina/oauth2/latest/).

```go
import ballerina/io;
import ballerina/websocket;

// Defines the WebSocket client to call the JWT auth secured APIs.
// The client is enriched with the `Authorization: Bearer <token>` header by
// passing the [`websocket:JwtIssuerConfig`](https://docs.central.ballerina.io/ballerina/websocket/latest/records/JwtIssuerConfig) for the `auth` configuration of the
// client. A self-signed JWT is issued before the request is sent.
websocket:Client securedEP = check new("wss://localhost:9090/foo/bar",
    auth = {
        username: "ballerina",
        issuer: "wso2",
        audience: ["ballerina", "ballerina.org", "ballerina.io"],
        keyId: "5a0b754-895f-4279-8843-b745e11a57e9",
        jwtId: "JlbmMiOiJBMTI4Q0JDLUhTMjU2In",
        customClaims: { "scp": "admin" },
        expTime: 3600,
        signatureConfig: {
            config: {
                keyFile: "../resource/path/to/private.key"
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
# Before testing this sample, first start a sample service secured with JWT Auth.
# You may need to change the trusted certificate file path and private key file path.
bal run websocket_client_self_signed_jwt_auth.bal
Hello, World!
```
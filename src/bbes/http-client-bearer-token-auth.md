# Client - Bearer Token Auth

 A client, which is secured with Bearer token auth can be used to connect to
 a secured service.<br/>
 The client is enriched with the `Authorization: Bearer <token>` header by
 passing the `http:BearerTokenConfig` for the `auth` configuration of the
 client.

```go
import ballerina/http;
import ballerina/io;

// Defines the HTTP client to call the secured APIs.
// The client is enriched with the `Authorization: Bearer <token>` header by
// passing the [`http:BearerTokenConfig`](https://docs.central.ballerina.io/ballerina/http/latest/records/BearerTokenConfig) for the `auth` configuration of the
// client.
http:Client securedEP = check new("https://localhost:9090",
    auth = {
        token: "56ede317-4511-44b4-8579-a08f094ee8c5"
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
# As a prerequisite, start a secured sample service.
# You may need to change the trusted certificate file path.
bal run http_client_bearer_token_auth.bal
Hello, World!
```
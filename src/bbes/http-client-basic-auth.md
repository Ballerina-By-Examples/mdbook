# Client - Basic Auth

 A client, which is secured with Basic auth can be used to connect to
 a secured service.<br/>
 The client is enriched with the `Authorization: Basic <token>` header by
 passing the `http:CredentialsConfig` for the `auth` configuration of the
 client.<br/><br/>
 For more information on the underlying module,
 see the [Auth module](https:docs.central.ballerina.io/ballerina/auth/latest/).

```go
import ballerina/http;
import ballerina/io;

// Defines the HTTP client to call the Basic auth secured APIs.
// The client is enriched with the `Authorization: Basic <token>` header by
// passing the [`http:CredentialsConfig`](https://docs.central.ballerina.io/ballerina/http/latest/records/CredentialsConfig) for the `auth` configuration of the
// client.
http:Client securedEP = check new("https://localhost:9090",
    auth = {
        username: "ldclakmal",
        password: "ldclakmal@123"
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
# As a prerequisite, start a sample service secured with Basic Auth.
# You may need to change the trusted certificate file path.
bal run http_client_basic_auth.bal
Hello, World!
```
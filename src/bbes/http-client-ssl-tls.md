# Client - SSL/TLS

 You can use the HTTPS client to connect or interact with an HTTPS listener.
 Provide the `http:ClientSecureSocket` configurations to the client to
 initiate an HTTPS connection.<br/><br/>
 For more information on the underlying module,
 see the [HTTP module](https:docs.central.ballerina.io/ballerina/http/latest/).

```go
import ballerina/http;
import ballerina/io;

// An HTTP client can be configured to communicate through HTTPS as well.
// To secure a client using HTTPS, the client needs to be configured with
// a certificate file of the listener.
// The [`http:ClientSecureSocket`](https://docs.central.ballerina.io/ballerina/http/latest/records/ClientSecureSocket) record
// provides the SSL-related configurations of the client.
http:Client securedEP = check new("https://localhost:9090",
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
# As a prerequisite, start a sample service secured with SSL.
# You may need to change the trusted certificate file path.
bal run http_client_ssl_tls.bal
Hello, World!
```
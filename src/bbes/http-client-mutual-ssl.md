# Client - Mutual SSL

 Ballerina supports mutual SSL, which is a certificate-based authentication
 process in which two parties (the client and server) authenticate each other by
 verifying the digital certificates. It ensures that both parties are assured
 of each other's identity.<br/><br/>
 For more information on the underlying module, 
 see the [HTTP module](https:docs.central.ballerina.io/ballerina/http/latest/).

```go
import ballerina/http;
import ballerina/io;

// An HTTP client can be configured to initiate new connections that are
// secured via mutual SSL.
// The [`http:ClientSecureSocket`](https://docs.central.ballerina.io/ballerina/http/latest/records/ClientSecureSocket) record provides the SSL-related configurations.
http:Client securedEP = check new("https://localhost:9090",
    secureSocket = {
        key: {
            certFile: "../resource/path/to/public.crt",
            keyFile: "../resource/path/to/private.key"
        },
        cert: "../resource/path/to/public.crt",
        protocol: {
            name: http:TLS
        },
        ciphers: ["TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA"]

    }
);

public function main() returns error? {
    string response = check securedEP->get("/foo/bar");
    io:println(response);
}
```

#### Output

```go
# As a prerequisite, start a sample service secured with mutual SSL.
# You may need to change the certificate file path, private key file path, and
# trusted certificate file path.
bal run http_client_mutual_ssl.bal
Hello, World!
```
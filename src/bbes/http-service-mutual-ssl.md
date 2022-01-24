# Service - Mutual SSL

 Ballerina supports mutual SSL, which is a certificate-based authentication
 process in which two parties (the client and server) authenticate each other by
 verifying the digital certificates. It ensures that both parties are assured
 of each other's identity.<br/><br/>
 For more information on the underlying module, 
 see the [HTTP module](https:docs.central.ballerina.io/ballerina/http/latest/).

```go
import ballerina/http;

// An HTTP listener can be configured to accept new connections that are
// secured via mutual SSL.
// The [`http:ListenerSecureSocket`](https://docs.central.ballerina.io/ballerina/http/latest/records/ListenerSecureSocket) record provides the SSL-related listener configurations.
listener http:Listener securedEP = new(9090,
    secureSocket = {
        key: {
            certFile: "../resource/path/to/public.crt",
            keyFile: "../resource/path/to/private.key"
        },
        // Enables mutual SSL.
        mutualSsl: {
            verifyClient: http:REQUIRE,
            cert: "../resource/path/to/public.crt"
        },
        // Enables the preferred SSL protocol and its versions.
        protocol: {
            name: http:TLS,
            versions: ["TLSv1.2", "TLSv1.1"]
        },
        // Configures the preferred ciphers.
        ciphers: ["TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA"]

    }
);

service /foo on securedEP {
    resource function get bar() returns string {
        return "Hello, World!";
    }
}
```

#### Output

```go
# You may need to change the certificate file path, private key file path, and
# trusted certificate file path.
bal run http_service_mutual_ssl.bal
```
# Service - SSL/TLS

 You can use the GraphQL listener to connect to or interact with an HTTPS client.
 Provide the `graphql:ListenerSecureSocket` configurations to the server to
 expose an HTTPS connection.<br/><br/>
 For more information on the underlying module, 
 see the [GraphQL module](https:docs.central.ballerina.io/ballerina/graphql/latest/).

```go
import ballerina/graphql;

// A GraphQL listener can be configured to communicate through HTTPS as well.
// To secure a listener using HTTPS, the listener needs to be configured with
// a certificate file and a private key file for the listener.
// The [`graphql:ListenerSecureSocket`](https://docs.central.ballerina.io/ballerina/graphql/latest/records/ListenerSecureSocket) record
// provides the SSL-related listener configurations of the listener.
listener graphql:Listener securedEP = new(9090,
    secureSocket = {
        key: {
            certFile: "../resource/path/to/public.crt",
            keyFile: "../resource/path/to/private.key"
        }
    }
);

service /graphql on securedEP {
    resource function get greeting() returns string {
        return "Hello, World!";
    }
}
```

#### Output

```go
# You may need to change the certificate file path and private key file path.
bal run graphql_service_ssl_tls.bal
```
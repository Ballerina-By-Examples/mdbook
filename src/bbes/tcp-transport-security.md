# Transport Security

 This example demonstrates how the Ballerina TCP client can be configured to
 connect to an SSL/TLS listener through a one-way SSL/TLS connection 
 (i.e., the server is verified by the client). This example uses the Ballerina
 TCP listener to host a service and the TCP client sends 
 requests to that listener.<br/><br/>
 For more information on the underlying module,
 see the [TCP module](https:docs.central.ballerina.io/ballerina/tcp/latest).

```go
import ballerina/io;
import ballerina/tcp;

// An TCP client can be configured to communicate through SSL/TLS as well.
// To secure a client using SSL/TLS, the client needs to be configured with
// a certificate file of the listener.
// The [`tcp:ClientSecureSocket`](https://docs.central.ballerina.io/ballerina/tcp/latest/records/ClientSecureSocket) record
// provides the SSL-related configurations of the client.
tcp:Client securedClientEP = check new("localhost", 3000,
    secureSocket = {
        cert: "../resource/path/to/public.crt"
    }
);

public function main() returns error? {
    check securedClientEP->writeBytes("Hello, World!".toBytes());
    readonly & byte[] receivedData = check securedClientEP->readBytes();
    io:println("Received message: ", string:fromBytes(receivedData));
    return securedClientEP->close();
}
```

#### Output

```go
# You may need to change the trusted certificate file path.
bal run tcp_transport_security_client.bal
Received message: Hello, World!
```

***

```go
import ballerina/io;
import ballerina/tcp;

// An HTTP listener can be configured to communicate through SSL/TLS as well.
// To secure a listener using SSL/TLS, the listener needs to be configured with
// a certificate file and a private key file for the listener.
// The [`tcp:ListenerSecureSocket`](https://docs.central.ballerina.io/ballerina/tcp/latest/records/ListenerSecureSocket) record
// provides the SSL-related listener configurations of the listener.
listener tcp:Listener securedListnerEP = check new(3000,
    secureSocket = {
        key: {
            certFile: "../resource/path/to/public.crt",
            keyFile: "../resource/path/to/private.key"
        }
    }
);

service "tcp" on securedListnerEP {
    isolated remote function onConnect(tcp:Caller caller)
                             returns tcp:ConnectionService {
        io:println("Client connected on server port: ", caller.remotePort);
        return new EchoService();
    }
}

service class EchoService {
    *tcp:ConnectionService;

    remote function onBytes(readonly & byte[] data) returns byte[] {
        io:println("Received message: ", string:fromBytes(data));
        return data;
    }
}
```

#### Output

```go
# You may need to change the certificate file path and private key file path.
bal run tcp_transport_security_service.bal
Client connected on server port: 5639
Received message: Hello, World!
```
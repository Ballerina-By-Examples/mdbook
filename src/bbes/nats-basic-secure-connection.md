# Secured Connection

 In this example, the underlying connections of the subscriber and the publisher are
 secured with TLS/SSL and basic authentication.<br/><br/>
 For more information on the underlying module,
 see the [`nats` module](https:docs.central.ballerina.io/ballerinax/nats/latest).

```go
import ballerinax/nats;

public function main() returns error? {

    string message = "Hello from Ballerina";

    // Initializes a NATS client with TLS/SSL and username/password authentication.
    nats:Client natsClient = check new(nats:DEFAULT_URL,

        // To secure the client connections using username/password authentication, provide the credentials
        // with the [`nats:Credentials`](https://docs.central.ballerina.io/ballerinax/nats/latest/records/Credentials) record.
        auth = {
             username: "alice",
             password: "alice@123"
        },

        // To secure the client connection using TLS/SSL, the client needs to be configured with
        // a certificate file of the server.
        // The [`nats:SecureSocket`](https://docs.central.ballerina.io/ballerinax/nats/latest/records/SecureSocket)
        // record provides the SSL-related configurations of the client.
        secureSocket = {
            cert: "../resource/path/to/public.crt"
        }
    );

    // Produces a message to the specified subject.
    check natsClient->publishMessage({
                             content: message.toBytes(),
                             subject: "security.demo"});

    // Closes the client connection.
    check natsClient.close();
}
```

#### Output

```go
bal run publisher.bal
```

***

```go
import ballerina/log;
import ballerinax/nats;

// Initializes a NATS listener with TLS/SSL and username/password authentication.
listener nats:Listener securedEP = new(nats:DEFAULT_URL,

    // To secure the client connections using username/password authentication, provide the credentials
    // with the [`nats:Credentials`](https://docs.central.ballerina.io/ballerinax/nats/latest/records/Credentials) record.
    auth = {
         username: "alice",
         password: "alice@123"
    },

    // To secure the client connection using TLS/SSL, the client needs to be configured with
    // a certificate file of the server.
    // The [`nats:SecureSocket`](https://docs.central.ballerina.io/ballerinax/nats/latest/records/SecureSocket)
    // record provides the SSL-related configurations of the client.
    secureSocket = {
        cert: "../resource/path/to/public.crt"
    }
);

// Binds the consumer to listen to the messages published
// to the 'security.demo' subject.
service "security.demo" on securedEP {

    remote function onMessage(nats:Message message) returns error? {
        string|error messageContent = string:fromBytes(message.content);
        if messageContent is string {
            log:printInfo("Received message: " + messageContent);
        }
    }
}
```

#### Output

```go
bal run subscriber.bal
time = 2021-05-19T10:15:49.269+05:30 level = INFO module = "" message = "Received message: Hello from Ballerina"
```
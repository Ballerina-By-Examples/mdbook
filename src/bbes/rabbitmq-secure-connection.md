# Secured Connection

 In this example, the underlying connections of the consumer and the producer are
 secured with TLS/SSL and basic authentication.<br/><br/>
 For more information on the underlying module, 
 see the [RabbitMQ module](https:docs.central.ballerina.io/ballerinax/rabbitmq/latest).

```go
import ballerina/log;
import ballerinax/rabbitmq;

listener rabbitmq:Listener securedEP = new(rabbitmq:DEFAULT_HOST, 5671,

    // To secure the client connections using username/password authentication, provide the credentials
    // with the [`rabbitmq:Credentials`](https://docs.central.ballerina.io/ballerinax/rabbitmq/latest/records/Credentials) record.
    auth = {
         username: "alice",
         password: "alice@123"
    },

    // To secure the client connection using TLS/SSL, the client needs to be configured with
    // a certificate file of the server.
    // The [`rabbitmq:SecureSocket`](https://docs.central.ballerina.io/ballerinax/rabbitmq/latest/records/SecureSocket)
    // record provides the SSL-related configurations of the client.
    secureSocket = {
        cert: "../resource/path/to/public.crt"
    }
);

@rabbitmq:ServiceConfig {
    queueName: "Secured"
}
// Attaches the service to the listener.
service rabbitmq:Service on securedEP {
    remote function onMessage(rabbitmq:Message message) {
        string|error messageContent = string:fromBytes(message.content);
        if (messageContent is string) {
            log:printInfo("Received message: " + messageContent);
        }
    }
}
```

#### Output

```go
bal run consumer.bal
time = 2021-05-20T14:49:11.011+05:30 level = INFO module = "" message = "Received message: Hello from Ballerina"
```

***

```go
import ballerinax/rabbitmq;

public function main() returns error? {
    // Creates a ballerina RabbitMQ client with TLS/SSL and username/password authentication.
    rabbitmq:Client rabbitmqClient = check new(rabbitmq:DEFAULT_HOST, 5671,

        // To secure the client connections using username/password authentication, provide the credentials
        // with the [`rabbitmq:Credentials`](https://docs.central.ballerina.io/ballerinax/rabbitmq/latest/records/Credentials) record.
        auth = {
             username: "alice",
             password: "alice@123"
        },

        // To secure the client connection using TLS/SSL, the client needs to be configured with
        // a certificate file of the server.
        // The [`rabbitmq:SecureSocket`](https://docs.central.ballerina.io/ballerinax/rabbitmq/latest/records/SecureSocket)
        // record provides the SSL-related configurations of the client.
        secureSocket = {
            cert: "../resource/path/to/public.crt"
        }
    );

    // Declares the queue, Secured.
    check rabbitmqClient->queueDeclare("Secured");

    // Publishes the message using the `rabbitmqClient` and the routing key named `Secured`.
    string message = "Hello from Ballerina";
    check rabbitmqClient->publishMessage({ content: message.toBytes(),
                                            routingKey: "Secured" });
}
```

#### Output

```go
bal run producer.bal
```
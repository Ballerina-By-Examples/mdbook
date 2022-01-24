# Client Acknowledgements

 In this example, the messages are consumed from an
 existing queue using the Ballerina RabbitMQ message listener.
 The received messages are acknowledged manually.
 By default, the ackMode is rabbitmq:AUTO_ACK, which will automatically acknowledge
 all messages once consumed.<br/><br/>
 For more information on the underlying module, 
 see the [RabbitMQ module](https:docs.central.ballerina.io/ballerinax/rabbitmq/latest).

```go
import ballerina/log;
import ballerinax/rabbitmq;

listener rabbitmq:Listener channelListener =
        new(rabbitmq:DEFAULT_HOST, rabbitmq:DEFAULT_PORT);

// The consumer service listens to the "MyQueue" queue.
// The `ackMode` is by default rabbitmq:AUTO_ACK where messages are acknowledged
// immediately after consuming.
@rabbitmq:ServiceConfig {
    queueName: "MyQueue"
}
// Attaches the service to the listener.
service rabbitmq:Service on channelListener {
    remote function onMessage(rabbitmq:Message message,
                                                    rabbitmq:Caller caller) {
        string|error messageContent = string:fromBytes(message.content);
        if messageContent is string {
            log:printInfo("Received message: " + messageContent);
        }

        // Positively acknowledges a single message.
        rabbitmq:Error? result = caller->basicAck();
    }
}
```

#### Output

```go
bal run rabbitmq_consumer_with_client_acknowledgement.bal
time = 2021-05-20T14:53:56.067+05:30 level = INFO module = "" message = "Received message: Hello from Ballerina"
```
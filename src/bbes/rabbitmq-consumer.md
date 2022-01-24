# Consumer

 In this example, the messages are consumed from an
 existing queue using the Ballerina RabbitMQ message listener.
 The Ballerina RabbitMQ connection used here can be re-used to create
 multiple channels.
 Multiple services consuming messages from the same queue or from
 different queues can be attached to the same Listener.<br/><br/>
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
    remote function onMessage(rabbitmq:Message message) {
        string|error messageContent = string:fromBytes(message.content);
        if messageContent is string {
            log:printInfo("Received message: " + messageContent);
        }
    }
}
```

#### Output

```go
bal run rabbitmq_consumer.bal
time = 2021-05-20T14:49:11.011+05:30 level = INFO module = "" message = "Received message: Hello from Ballerina"
```
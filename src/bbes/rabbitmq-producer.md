# Producer

 In this example, messages are sent to two different queues,
 to one queue using the same channel and to the other using two different channels.<br/><br/>
 For more information on the underlying module, 
 see the [RabbitMQ module](https:docs.central.ballerina.io/ballerinax/rabbitmq/latest).

```go
import ballerinax/rabbitmq;

public function main() returns error? {
    // Creates a ballerina RabbitMQ client.
    rabbitmq:Client newClient =
                check new(rabbitmq:DEFAULT_HOST, rabbitmq:DEFAULT_PORT);

    // Declares the queue, MyQueue.
    check newClient->queueDeclare("MyQueue");

    // Publishing messages to an exchange using a routing key.
    // Publishes the message using newClient and the routing key named MyQueue.
    string message = "Hello from Ballerina";
    check newClient->publishMessage({ content: message.toBytes(),
                                            routingKey: "MyQueue" });
}
```

#### Output

```go
bal run rabbitmq_producer.bal
```
# Transactional Producer

 In this example, a message is sent to an existing queue
 using the Ballerina RabbitMQ channel and Ballerina transactions.
 Upon successful execution of the transaction block,
 the channel will commit and rollback in the case of any error.
 For more information on the underlying module,
 see the [RabbitMQ module](https:docs.central.ballerina.io/ballerinax/rabbitmq/latest).

```go
import ballerinax/rabbitmq;

public function main() returns error? {
    // Creates a ballerina RabbitMQ Client.
    rabbitmq:Client newClient =
            check new (rabbitmq:DEFAULT_HOST, rabbitmq:DEFAULT_PORT);

    // Declares the queue.
    check newClient->queueDeclare("MyQueue");
    transaction {
        string message = "Hello from Ballerina";
        // Publishes the message using the routing key named "MyQueue".
        check newClient->publishMessage({ content: message.toBytes(),
                                                    routingKey: "MyQueue" });
        check commit;
    }
}
```

#### Output

```go
bal run rabbitmq_transaction_producer.bal
```
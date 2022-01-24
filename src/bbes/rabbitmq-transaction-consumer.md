# Transactional Consumer

 In this example, the messages are consumed from an
 existing queue using the Ballerina RabbitMQ message listener
 and Ballerina transactions.
 Upon successful execution of the transaction block,
 the acknowledgement will commit or rollback in the case of any error.
 Messages will not be re-queued in the case of a rollback
 automatically unless negatively acknowledged by the user.
 For more information on the underlying module,
 see the [RabbitMQ module](https:docs.central.ballerina.io/ballerinax/rabbitmq/latest).

```go
import ballerina/log;
import ballerinax/rabbitmq;

// The consumer service listens to the "MyQueue" queue.
@rabbitmq:ServiceConfig {
    queueName: "MyQueue",
    autoAck: false
}
// Attaches the service to the listener.
service /transactionConsumer on
    new rabbitmq:Listener(rabbitmq:DEFAULT_HOST, rabbitmq:DEFAULT_PORT) {

    // Gets triggered when a message is received by the queue.
    remote function onMessage(rabbitmq:Message message,
                                rabbitmq:Caller caller) {

        string|error messageContent = 'string:fromBytes(message.content);
        if messageContent is string {
            log:printInfo("The message received: " + messageContent);
        }

        // Acknowledges a single message positively.
        // The acknowledgement gets committed upon successful execution of the transaction,
        // or will rollback otherwise.
        transaction {
            rabbitmq:Error? result = caller->basicAck();
            if (result is error) {
                log:printError(
                            "Error occurred while acknowledging the message.");
            }
            error? res = commit;
        }
    }
}
```

#### Output

```go
bal run rabbitmq_transaction_consumer.bal
time = 2021-01-18 15:15:36,514 level = INFO  module = "" message = "The message received: Hello from Ballerina"
```
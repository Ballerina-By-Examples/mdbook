# Transactional Producer

 This example shows you how to do transactional message producing by sending
 messages to kafka brokers atomically using the `kafka:Producer` object. For
 this example to work properly, an active Kafka broker should be present.
 <br/><br/>
 For more information on the underlying module, 
 see the [Kafka module](https:docs.central.ballerina.io/ballerinax/kafka/latest).

```go
import ballerina/io;
import ballerinax/kafka;

kafka:ProducerConfiguration producerConfigs = {
    clientId: "basic-producer",
    acks: "all",
    retryCount: 3,
    // The `enableIdempotence` should set to `true` to make a producer transactional.
    enableIdempotence: true,

    // A `transactionalId` must be provided to make a producer transactional.
    transactionalId: "test-transactional-id"
};

kafka:Producer kafkaProducer = check new (kafka:DEFAULT_URL, producerConfigs);

public function main() {
    string message = "Hello World Transaction Message";
    byte[] serializedMessage = message.toBytes();
    // Creates a producer config with optional parameters.
    // The `transactionalId` enables transactional message production.
    kafkaAdvancedTransactionalProduce(serializedMessage);
}

function kafkaAdvancedTransactionalProduce(byte[] message) {
    transaction {
        kafka:Error? sendResult = kafkaProducer->send({
            topic: "test-kafka-topic",
            value: message,
            partition: 0
        });
        // Checks for an error and notifies if an error has occurred.
        if sendResult is kafka:Error {
            io:println("Error occurred when sending message ", sendResult);
        }

        var commitResult = commit;
        if commitResult is () {
            io:println("Transaction successful");
        } else {
            io:println("Transaction unsuccessful " + commitResult.message());
        }
    }
}
```

#### Output

```go
bal run kafka_message_producer_transactional.bal
Transaction successful
```
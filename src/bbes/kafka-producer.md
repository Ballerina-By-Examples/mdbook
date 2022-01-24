# Producer

 This is an example on how to send messages to a Kafka topic using a
 `kafka:Producer` object. The producer is configured to send `string`
 values and `int` keys. For this example to work properly, an active Kafka
 broker should be present.<br/><br/>
 For more information on the underlying module, 
 see the [Kafka module](https:docs.central.ballerina.io/ballerinax/kafka/latest).

```go
import ballerinax/kafka;

kafka:Producer kafkaProducer = check new (kafka:DEFAULT_URL);

public function main() returns error? {
    string message = "Hello World, Ballerina";
    // Sends the message to the Kafka topic.
    check kafkaProducer->send({
                                topic: "test-kafka-topic",
                                value: message.toBytes() });

    // Flushes the sent messages.
    check kafkaProducer->'flush();
}
```

#### Output

```go
bal run kafka_producer.bal
```
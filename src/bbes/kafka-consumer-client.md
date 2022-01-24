# Consumer Client

 This is an example on how to use a `kafka:Consumer` as a simple record
 consumer. The records from a subscribed topic can be retrieved using the
 `poll()` function.
 This consumer uses the builtin byte array deserializer for both the key and
 the value, which is the default deserializer in the `kafka:Consumer`. For
 this example to work properly, an active Kafka broker should be present.
 <br/><br/>
 For more information on the underlying module, 
 see the [Kafka module](https:docs.central.ballerina.io/ballerinax/kafka/latest).

```go
import ballerinax/kafka;
import ballerina/io;

kafka:ConsumerConfiguration consumerConfiguration = {
    groupId: "group-id",
    offsetReset: "earliest",
    // Subscribes to the topic `test-kafka-topic`.
    topics: ["test-kafka-topic"]

};

kafka:Consumer consumer = check new (kafka:DEFAULT_URL, consumerConfiguration);

public function main() returns error? {
    // Polls the consumer for messages.
    kafka:ConsumerRecord[] records = check consumer->poll(1);

    foreach var kafkaRecord in records {
        byte[] messageContent = kafkaRecord.value;
        // Converts the `byte[]` to a `string`.
        string message = check string:fromBytes(messageContent);

        // Prints the retrieved Kafka record.
        io:println("Received Message: " + message);
    }
}
```

#### Output

```go
bal run kafka_consumer_client.bal
```
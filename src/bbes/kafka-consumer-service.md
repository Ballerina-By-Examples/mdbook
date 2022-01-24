# Consumer Service

 This is an example, which creates a Kafka consumer used as a listener
 to a service with manual offset commits.
 This consumer uses the builtin `int` deserializer for the keys and the
 builtin `string` deserializer for the values. For this example to work
 properly, an active Kafka broker should be present.<br/><br/>
 For more information on the underlying module, 
 see the [Kafka module](https:docs.central.ballerina.io/ballerinax/kafka/latest).

```go
import ballerinax/kafka;
import ballerina/log;

kafka:ConsumerConfiguration consumerConfigs = {
    groupId: "group-id",
    // Subscribes to the topic `test-kafka-topic`.
    topics: ["test-kafka-topic"],

    pollingInterval: 1,
    // Sets the `autoCommit` to `false` so that the records should be committed manually.
    autoCommit: false
};

listener kafka:Listener kafkaListener =
        new (kafka:DEFAULT_URL, consumerConfigs);

service kafka:Service on kafkaListener {
    remote function onConsumerRecord(kafka:Caller caller,
                                kafka:ConsumerRecord[] records) returns error? {
        // The set of Kafka records received by the service are processed one by one.
        foreach var kafkaRecord in records {
            check processKafkaRecord(kafkaRecord);
        }

        // Commits offsets of the returned records by marking them as consumed.
        kafka:Error? commitResult = caller->commit();

        if commitResult is error {
            log:printError("Error occurred while committing the " +
                "offsets for the consumer ", 'error = commitResult);
        }
    }
}

function processKafkaRecord(kafka:ConsumerRecord kafkaRecord) returns error? {
    // The value should be a `byte[]` since the byte[] deserializer is used
    // for the value.
    byte[] value = kafkaRecord.value;

    // Converts the `byte[]` to a `string`.
    string messageContent = check string:fromBytes(value);
    log:printInfo("Received Message: " + messageContent);
}
```

#### Output

```go
bal run kafka_consumer_service.bal
```
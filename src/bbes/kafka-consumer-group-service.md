# Consumer Groups

 This is an example of a Kafka consumer used as a listener to listen to a
 given topic/topics. The listener uses a group of concurrent consumers within
 the service. This consumer uses the builtin `string` deserializer for the
 values. For this example to work properly, an active Kafka broker should be
 present.<br/><br/>
 For more information on the underlying module, 
 see the [Kafka module](https:docs.central.ballerina.io/ballerinax/kafka/latest).

```go
import ballerinax/kafka;
import ballerina/log;

kafka:ConsumerConfiguration consumerConfigs = {
    // Uses two concurrent consumers to work as a group.
    concurrentConsumers: 2,

    groupId: "group-id",
    // Subscribes to the `test-kafka-topic`.
    topics: ["test-kafka-topic"],

    pollingInterval: 1
};

listener kafka:Listener kafkaListener =
            new (kafka:DEFAULT_URL, consumerConfigs);

service kafka:Service on kafkaListener {
    // This remote function executes when a message or a set of messages are published
    // to the subscribed topic/topics.
    remote function onConsumerRecord(kafka:Caller caller,
                        kafka:ConsumerRecord[] records) returns error? {
        // The set of Kafka records received by the service are processed one
        // by one.
        foreach var kafkaRecord in records {
            check processKafkaRecord(kafkaRecord);
        }

    }
}

function processKafkaRecord(kafka:ConsumerRecord kafkaRecord) returns error? {
    byte[] messageContent = kafkaRecord.value;
    // Converts the `byte[]` to a `string`.
    string message = check string:fromBytes(messageContent);

    // Prints the retrieved message.
    log:printInfo("Received Message: " + message);
}
```

#### Output

```go
bal run kafka_consumer_group_service.bal
```
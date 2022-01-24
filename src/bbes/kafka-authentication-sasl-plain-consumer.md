# SASL Authentication - Consumer

 This is an example of a Kafka consumer using the SASL/PLAIN authentication.
 For this example to work properly, an active Kafka server must be present
 and it should be configured to use the SASL/PLAIN authentication mechanism.
 <br/><br/>
 For more information on the underlying module,
 see the [Kafka module](https:docs.central.ballerina.io/ballerinax/kafka/latest).

```go
import ballerinax/kafka;
import ballerina/log;

// Define the relevant SASL URL of the configured Kafka server.
const string SASL_URL = "localhost:9093";

kafka:ConsumerConfiguration consumerConfig = {
    groupId: "test-group",
    topics: ["demo-security"],
    // Provide the relevant authentication configurations to authenticate the consumer by [`kafka:AuthenticationConfiguration`](https://docs.central.ballerina.io/ballerinax/kafka/latest/records/AuthenticationConfiguration).
    auth: {
        // Provide the authentication mechanism used by the Kafka server.
        mechanism: kafka:AUTH_SASL_PLAIN,
        // Username and password should be set here in order to authenticate the consumer.
        // For information on how to secure values instead of directly using plain text values, see [Defining Configurable Variables](https://ballerina.io/learn/user-guide/configurability/defining-configurable-variables/#securing-sensitive-data-using-configurable-variables).
        username: "alice",
        password: "alice@123"
    },
    securityProtocol: kafka:PROTOCOL_SASL_PLAINTEXT
};

listener kafka:Listener kafkaListener = new(SASL_URL, consumerConfig);

service kafka:Service on kafkaListener {
    remote function onConsumerRecord(kafka:Caller caller,
                    kafka:ConsumerRecord[] records) returns error? {
        foreach var consumerRecord in records {
            string value = check string:fromBytes(consumerRecord.value);
            log:printInfo(value);
        }
    }
}
```

#### Output

```go
bal run kafka_authentication_sasl_plain_consumer.bal
```
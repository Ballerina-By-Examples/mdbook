# Durable Subscriptions

 This sample demonstrates creating a durable subscription
 in the NATS Streaming server. Regular subscriptions remember
 their position while the client is connected. If the client
 disconnects, the position is lost. Durable subscriptions
 remember their position even if the client is disconnected.<br/><br/>
 For more information on the underlying module, 
 see the [STAN module](https:docs.central.ballerina.io/ballerinax/stan/latest).

```go
import ballerina/io;
import ballerinax/stan;

// Produces a message to a subject in the NATS sever.
public function main() returns error? {
    string message = "Hello from Ballerina";
    stan:Client stanClient = check new(stan:DEFAULT_URL);

    // Produces a message to the specified subject.
    string result = check stanClient->publishMessage({
                                    content: message.toBytes(),
                                    subject: "demo"});
    io:println("GUID " + result + " received for the produced message.");
    // Closes the client connection.
    check stanClient.close();
}
```

#### Output

```go
bal run publisher.bal
GUID m2jS6SLLefK325DWTkkwBh received for the produced message.
```

***

```go
import ballerina/log;
import ballerinax/stan;

// Initializes the NATS Streaming listener with a specific client ID.
listener stan:Listener lis = new(stan:DEFAULT_URL, clientId = "c0");

// Provides the durable name to create a durable subscription.
@stan:ServiceConfig {
    subject: "demo",
    durableName: "sample-name"
}
service stan:Service on lis {
    remote function onMessage(stan:Message message) {
        // Prints the incoming message in the console.
        string|error messageData = string:fromBytes(message.content);
        if messageData is string {
            log:printInfo("Received message: " + messageData);
        }
    }
}
```

#### Output

```go
bal run subscriber.bal
time = 2021-05-20T13:03:23.344+05:30 level = INFO module = "" message = "Received message: Hello from Ballerina"

# Stop the subscriber and publish some messages while it is stopped.
# Run the subscriber again.
# All messages which had been published while the subscriber
# wasn't running should be received.

bal run subscriber.bal
time = 2021-05-20T13:03:46.928+05:30 level = INFO module = "" message = "Received message: Hello from Ballerina"
```
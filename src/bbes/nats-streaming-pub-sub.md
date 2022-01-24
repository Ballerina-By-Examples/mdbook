# Publish/Subscribe

 This sample demonstrates a basic publish/subscribe implementation of the NATS Streaming client
 In order to run this sample, a NATS Streaming server should be
 running on the corresponding port used in the sample.<br/><br/>
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

// Initializes the NATS Streaming listener.
listener stan:Listener lis = new(stan:DEFAULT_URL);

// Binds the consumer to listen to the messages published to the 'demo' subject.
@stan:ServiceConfig {
    subject: "demo"
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
time = 2021-05-20T12:51:47.417+05:30 level = INFO module = "" message = "Received message: Hello from Ballerina"
```
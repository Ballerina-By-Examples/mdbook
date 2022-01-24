# Publish/Subscribe

 The NATS client is used either to produce a message to a subject or consume a message from a subject.
 In order to execute this example, it is required that a NATS server is up and running on its default host, port, and cluster.
 For instructions on installing the NATS server,
 go to [NATS Server Installation](https:docs.nats.io/nats-server/installation).<br/><br/>
 This is a simple publish/subscribe messaging pattern example.
 For more information on the underlying module, 
 see the [`nats` module](https:docs.central.ballerina.io/ballerinax/nats/latest).

```go
import ballerinax/nats;

public function main() returns error? {
    string message = "Hello from Ballerina";
    // Initializes a NATS client.
    nats:Client natsClient = check new(nats:DEFAULT_URL);

    // Produces a message to the specified subject.
    check natsClient->publishMessage({
                             content: message.toBytes(),
                             subject: "demo.bbe"});

    // Closes the client connection.
    check natsClient.close();
}
```

#### Output

```go
bal run publisher.bal
```

***

```go
import ballerina/log;
import ballerinax/nats;

// Initializes a NATS listener.
listener nats:Listener subscription = new(nats:DEFAULT_URL);

// Binds the consumer to listen to the messages published
// to the 'demo.bbe' subject.
service "demo.bbe" on subscription {

    remote function onMessage(nats:Message message) returns error? {

        // Logs the incoming message.
        string|error messageContent = string:fromBytes(message.content);
        if messageContent is string {
            log:printInfo("Received message: " + messageContent);
        }
    }
}
```

#### Output

```go
bal run subscriber.bal
time = 2021-05-19T10:15:49.269+05:30 level = INFO module = "" message = "Received message: Hello from Ballerina"
```
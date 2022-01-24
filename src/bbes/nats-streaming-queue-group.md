# Queue Groups

 This sample demonstrates leveraging the NATS built-in load balancing
 feature called "distributed queues". All subscribers with the
 same queue name form the queue group.  As messages on the registered
 subject are published, one member of the group is chosen randomly
 to receive the message. Although queue groups have multiple subscribers,
 each message is consumed by only one.<br/><br/>
 For more information on the underlying module, 
 see the [STAN module](https:docs.central.ballerina.io/ballerinax/stan/latest).

```go
import ballerina/io;
import ballerinax/stan;

// Represents the escape character.
const string ESCAPE = "!q";

// Produces a message to a subject in the NATS Streaming sever.
public function main() returns error? {
    string message = "";
    stan:Client publisher = check new(stan:DEFAULT_URL);

    while (message != ESCAPE) {
        message = io:readln("Message: ");
        if message != ESCAPE {

            // Produces a message to the specified subject.
            string result = check publisher->publishMessage({
                                    content: message.toBytes(),
                                    subject: "demo"});
            io:println("GUID " + result +
                            " received for the produced message.");
        }
    }
}
```

#### Output

```go
bal run publisher.bal
Message: First Message
GUID ywNe3mXd96jFL33ouJbFfg received for the produced message.
Message: Second Message
GUID ywNe3mXd96jFL33ouJbFkp received for the produced message.
Message: Third Message
GUID ywNe3mXd96jFL33ouJbFpy received for the produced message.
```

***

```go
import ballerina/log;
import ballerinax/stan;

// Initializes the NATS Streaming listeners.
listener stan:Listener lis = new(stan:DEFAULT_URL);

// Binds the consumer to listen to the messages published to the 'demo' subject.
// Belongs to the queue group named "sample-queue-group"
@stan:ServiceConfig {
    subject: "demo",
    queueGroup: "sample-queue-group"
}
service stan:Service on lis {
    remote function onMessage(stan:Message message) {
       // Prints the incoming message in the console.
       string|error messageData = string:fromBytes(message.content);
       if messageData is string {
            log:printInfo("Message Received to first queue group member: "
                                                        + messageData);
       }
    }
}

// Belongs to the queue group named "sample-queue-group"
@stan:ServiceConfig {
    subject: "demo",
    queueGroup: "sample-queue-group"
}
service stan:Service on lis {
    remote function onMessage(stan:Message message) {
       // Prints the incoming message in the console.
       string|error messageData = string:fromBytes(message.content);
       if messageData is string {
            log:printInfo("Message Received to second queue group member: "
                                                        + messageData);
       }
    }
}

// Belongs to the queue group named "sample-queue-group"
@stan:ServiceConfig {
    subject: "demo",
    queueGroup: "sample-queue-group"
}
service stan:Service on lis {
    remote function onMessage(stan:Message message) {
       // Prints the incoming message in the console.
       string|error messageData = string:fromBytes(message.content);
       if messageData is string {
            log:printInfo("Message Received to third queue group member: "
                                                        + messageData);
       }
    }
}
```

#### Output

```go
# `queue-group.bal` contains three services belonging to the same
# queue group.
# When several messages are published, it can be noticed that
# each message is received by only one queue group member.
bal run queue-group.bal
Message Received to first queue group member: First Message
Message Received to third queue group member: Second Message
Message Received to second queue group member: Third Message
```
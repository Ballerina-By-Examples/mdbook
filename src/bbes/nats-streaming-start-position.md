# Historical Message Replay

 This sample demonstrates leveraging the historical
 message replay feature of Streaming NATS.
 New subscriptions may specify a starting position in the stream of
 messages stored for the channel of the subscribed subject.
 Message delivery may begin at:
 1. The earliest message stored for this subject
 2. The most recently stored message for this subject
    prior to the start of the current subscription.
 3. A historical offset from the current server date/time
    (e.g., the last 30 seconds).
 4. A specific message sequence number<br/><br/>
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
GUID UBMEgrERHdxZRqUBP05PtD received for the produced message.
Message: Second Message
GUID UBMEgrERHdxZRqUBP05Puz received for the produced message.
Message: Third Message
GUID UBMEgrERHdxZRqUBP05Pwl received for the produced message.
Message: Forth Message
GUID UBMEgrERHdxZRqUBP05PyX received for the produced message.
```

***

```go
import ballerina/log;
import ballerinax/stan;

// Initializes the NATS Streaming listener.
listener stan:Listener lis = new(stan:DEFAULT_URL);

// Binds the consumer to listen to the messages published to the 'demo' subject.
// By default, only new messages are received.
@stan:ServiceConfig {
    subject: "demo"
}
service stan:Service on lis {
    remote function onMessage(stan:Message message) {
        // Prints the incoming message in the console.
        string|error messageData = string:fromBytes(message.content);
        if messageData is string {
            log:printInfo("Message Received to service receiveNewOnly: "
                + messageData);
        }
    }
}

// Binds the consumer to listen to the messages published to the 'demo' subject.
// Receives all the messages from the beginning.
@stan:ServiceConfig {
    subject: "demo",
    startPosition: stan:FIRST
}
service stan:Service on lis {
    remote function onMessage(stan:Message message) {
        // Prints the incoming message in the console.
        string|error messageData = string:fromBytes(message.content);
        if messageData is string {
            log:printInfo("Message Received to service receiveFromBegining: "
                + messageData);
        }
    }
}

// Binds the consumer to listen to the messages published to the 'demo' subject.
// Receives messages starting from the last received message.
@stan:ServiceConfig {
    subject: "demo",
    startPosition: stan:LAST_RECEIVED
}
service stan:Service on lis {
    remote function onMessage(stan:Message message) {
        // Prints the incoming message in the console.
        string|error messageData = string:fromBytes(message.content);
        if messageData is string {
            log:printInfo("Message Received to service " +
            "receiveFromLastReceived: " + messageData);
        }
    }
}

[stan:SEQUENCE_NUMBER, int] sequenceNo = [stan:SEQUENCE_NUMBER, 3];
// Binds the consumer to listen to the messages published to the 'demo' subject.
// Receives messages starting from the provided sequence number.
@stan:ServiceConfig {
    subject: "demo",
    startPosition: sequenceNo
}
service stan:Service on lis {
    remote function onMessage(stan:Message message) {
        // Prints the incoming message in the console.
        string|error messageData = string:fromBytes(message.content);
        if messageData is string {
            log:printInfo("Message Received to service receiveFromGivenIndex: "
                + messageData);
        }
    }
}

[stan:TIME_DELTA_START, int] timeDelta = [stan:TIME_DELTA_START, 5];
// Binds the consumer to listen to the messages published to the 'demo' subject.
// Receives messages since the provided historical time delta.
@stan:ServiceConfig {
    subject: "demo",
    startPosition: timeDelta
}
service stan:Service on lis {
    remote function onMessage(stan:Message message) {
        // Prints the incoming message in the console.
        string|error messageData = string:fromBytes(message.content);
        if messageData is string {
            log:printInfo("Message Received to service receiveSinceTimeDelta: "
                + messageData);
        }
    }
}
```

#### Output

```go
# When you start the subscriber after publishing several messages,
# You'll notice that,
# 1. `receiveSinceTimeDelta` service receives the messages if
#     the messages were sent within a historical offset of 5 seconds
#     from the current server date/time
# 2. `receiveFromGivenIndex` service receives services messages
#     starting from the third message published.
# 3. `receiveFromLastReceived` service receives messages starting
#     from the last published message.
# 4. `receiveFromBeginning` service receives all messages ever
#     published
# 5. `receiveNewOnly` service receives only the messages, which are
#    published after the subscriber starts.

bal run subscriber.bal
Message Received to service receiveSinceTimeDelta: Third Message
Message Received to service receiveFromGivenIndex: Third Message
Message Received to service receiveFromLastReceived: Third Message
Message Received to service receiveFromBeginning: First Message
Message Received to service receiveFromBeginning: Second Message
Message Received to service receiveFromBeginning: Third Message
Message Received to service receiveFromGivenIndex: Forth Message
Message Received to service receiveFromLastReceived: Forth Message
Message Received to service receiveNewOnly: Forth Message
Message Received to service receiveSinceTimeDelta: Forth Message
Message Received to service receiveFromBeginning: Forth Message
```
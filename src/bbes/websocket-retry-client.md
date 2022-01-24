# Retry

 If the WebSocket client lost the connection due to some transient failure, it automatically tries to
 reconnect to the given backend. If the maximum reconnect attempt is reached it gives up on the connection. <br/><br/>
 For more information on the underlying module,
 see the [WebSocket module](https:lib.ballerina.io/ballerina/websocket/latest/).

```go
import ballerina/io;
import ballerina/lang.runtime;
import ballerina/websocket;

public function main() returns error? {
    websocket:Client wsClient = check new("ws://localhost:9090/foo", {
        // Set the maximum retry count to 20 so that it will try 20 times with an interval of
        // 1 second in between the retry attempts.
        retryConfig: { maxCount: 20 }
    });
    // Read the message sent from the server upon upgrading to a WebSocket connection.
    string text = check wsClient->readTextMessage();
    io:println(text);
    io:println("Sleeping for 5 seconds. Please shutdown the server now.");
    runtime:sleep(5);
    io:println("Please restart the server now.");
    // Client will retry 20 times(20 seconds in time) until the server gets started.
    string retryMsg = check wsClient->readTextMessage();
    io:println(retryMsg);
}
```

#### Output

```go
# As a prerequisite, start a sample WebSocket service, which sends a message to the client upon upgrading to a WebSocket connection.
# If you are using a Ballerina WebSocket server, you can send a message to the client in the `onOpen` resource.
# The client will first connect to the server and then it will wait for 5 seconds to give time for the server to shut down.
# Start the server after 5 seconds so that the client will start retrying to connect to the server and read messages.
bal run websocket_retry_client.bal
Hello World!
Sleeping for 5 seconds. Please shutdown the server now.
Please restart the server now.
Hello World!
```
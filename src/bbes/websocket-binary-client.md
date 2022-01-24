# Handle Binary Messages with Client

 The WebSocket client can be used to connect to and interact with a WebSocket server in a Synchronous manner.This example demonstrates how to read and write binary messages using ballerina websocket client<br/><br/>
 For more information on the underlying module,
 see the [WebSocket module](https:docs.central.ballerina.io/ballerina/websocket/latest/).

```go
import ballerina/io;
import ballerina/lang.'string;
import ballerina/websocket;

public function main() returns error? {
    // Create a new [WebSocket client](https://docs.central.ballerina.io/ballerina/websocket/latest/clients/Client).
   websocket:Client wsClient = check new("ws://echo.websocket.org");

   // Write a binary message to the server using [writeBinaryMessage](https://docs.central.ballerina.io/ballerina/websocket/latest/clients/Client#writeBinaryMessage).
   check wsClient->writeBinaryMessage("Binary message".toBytes());

   // Read a binary message echoed from the server using [readBinaryMessage](https://docs.central.ballerina.io/ballerina/websocket/latest/clients/Client#readBinaryMessage).
   byte[] byteResp = check wsClient->readBinaryMessage();
   string stringResp = check 'string:fromBytes(byteResp);
   io:println(stringResp);
}
```

#### Output

```go
bal run websocket_binary_client.bal

Binary message
```
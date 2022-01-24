# Handle Text Messages with Client

 The WebSocket client can be used to connect to and interact with a WebSocket server in a Synchronous manner. This example demonstrates how to read and write text messages using ballerina websocket client<br/><br/>
 For more information on the underlying module,
 see the [WebSocket module](https:lib.ballerina.io/ballerina/websocket/latest/).

```go
import ballerina/io;
import ballerina/websocket;

public function main() returns error? {
    // Create a new [WebSocket client](https://lib.ballerina.io/ballerina/websocket/latest/clients/Client).
   websocket:Client wsClient = check new("ws://echo.websocket.org");

   // Write a text message to the server using [writeTextMessage](https://lib.ballerina.io/ballerina/websocket/latest/clients/Client#writeTextMessage).
   check wsClient->writeTextMessage("Text message");

   // Read a text message echoed from the server using [readTextMessage](https://lib.ballerina.io/ballerina/websocket/latest/clients/Client#readTextMessage).
   string textResp = check wsClient->readTextMessage();
   io:println(textResp);
}
```

#### Output

```go
bal run websocket_text_client.bal

Text message
```
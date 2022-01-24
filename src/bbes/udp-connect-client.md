# Connection-Oriented Client

 The ConnectClient is configured so that it only receives data from,
 and sends data to, the given remote peer address. Once connected,
 data may not be received from or sent to any other address.
 The client remains connected until it is explicitly disconnected or until it is closed.
 This sample demonstrates how to send data to a connected server and print the echoed response.<br/><br/>
 For more information on the underlying module, 
 see the [UDP module](https:docs.central.ballerina.io/ballerina/udp/latest).

```go
// This is the connection oriented client implementation of the UDP socket.
import ballerina/io;
import ballerina/udp;

public function main() returns error? {
  
    // Creates a new connection-oriented UDP client by providing the
    // `remoteHost` and the `remotePort`.
    // Optionally, you can provide the interface that the socket needs to bind 
    // and the timeout in milliseconds, which specifies the read timeout value.
    // E.g.: `udp:Client client = new ("www.ballerina.com", 80,
    // localHost = "localhost", timeout = 5);`
    udp:ConnectClient socketClient = check new("localhost", 8080);

    string msg = "Hello Ballerina echo";

    // Sends the data to the connected remote host.
    // The parameter is a `byte[]`, which contains the data to be sent.
    check socketClient->writeBytes(msg.toBytes());
    io:println("Data was sent to the remote host.");

    // Waits until the data is received from the connected host.
    readonly & byte[] result = check socketClient->readBytes();
    io:println("Received: ", string:fromBytes(result));

    // Closes the client and releases the bound port.
    check socketClient->close();

}
```

#### Output

```go
bal run udp_connect_client.bal

# This will print the output below upon a successful write.
Data was sent to the remote host.
# Print the response that is returned from the server as an echo.
Received: Hello Ballerina echo
```
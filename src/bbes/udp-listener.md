# Listener

 The UDP Listener is used to expose a UDP service over the UDP protocol.
 The UDP `Client`/`ConnectClient` is used to send data to a remote UDP server.
 This sample demonstrates the UDP socket listener.<br/><br/>
 For more information on the underlying module, 
 see the [UDP module](https:docs.central.ballerina.io/ballerina/udp/latest).

```go
import ballerina/io;
import ballerina/udp;

// Binds the service to the port.
// Optionally, you can provide the `remoteHost` and `remotePort` to
// configure the listener as a connected listener, which only
// reads and writes to the configured remote host.
// E.g.: `udp:Listener(8080, remoteHost
// = "www.remote-clinet.com", remotePort = 9090)`
service on new udp:Listener(8080) {

    // This remote method is invoked once the content is received from the
    // client. You may replace the `onBytes` method with `onDatagram`, which
    // reads the data as `readonly & udp:Datagram`.
    remote function onDatagram(readonly & udp:Datagram datagram) 
        returns udp:Datagram|udp:Error? {
        io:println("Received by listener: ", string:fromBytes(datagram.data));
        // Echoes back the data to the same client.
        // This is similar to calling `caller->sendDatagram(data);`.
        return datagram;
    }
}
```

#### Output

```go
bal run udp_listener.bal

# This will print the output below upon a successful read by the listener.
Received by listener: Hello Ballerina echo
```
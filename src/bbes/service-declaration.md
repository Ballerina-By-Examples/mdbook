# Service Declaration

 A service represents a collection of remotely accessible methods attached to a particular listener.
 A service declaration is syntactic sugar for creating services in Ballerina. 
 A service declaration gets desugared into several things including creating a listener object,
 registering it with the module, creating a service object, attaching the service object to the listener object, etc,.
 The type of the listener determines required type of remote methods.

```go
import ballerina/io;
import ballerina/udp;

// You can combine a listener declaration with a service declaration as shown in this example.
service on new udp:Listener(8080) {
    remote function onDatagram(readonly & udp:Datagram dg) {
        io:println("bytes received: ", dg.data.length());
    }
}
```

#### Output

```go
bal run service_declaration.bal
bytes received: 17
```
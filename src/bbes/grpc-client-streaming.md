# Client Streaming RPC

 The gRPC Server Connector is used to expose gRPC services over HTTP/2.
 This example includes a gRPC client streaming service and a client. The client writes a sequence of messages and sends them to the server.
 Once the client has finished writing the messages, it waits for the server to read them and return a response.<br/><br/>
 For more information on the underlying module, 
 see the [GRPC module](https:docs.central.ballerina.io/ballerina/grpc/latest/).

```go
# Create new Protocol Buffers definition file `grpc_client_streaming.proto` and add service definition.
# Run the command below in the Ballerina tools distribution for stub generation.
bal grpc --input grpc_client_streaming.proto  --output stubs

# Once you run the command, `grpc_client_streaming_pb.bal` file is generated inside stubs directory.

# For more information on how to use the Ballerina Protocol Buffers tool, see the [Proto To Ballerina](https://ballerina.io/learn/by-example/proto-to-ballerina.html) example.
```

***

```go
// This is the server implementation of the client streaming scenario.
import ballerina/grpc;
import ballerina/log;

@grpc:ServiceDescriptor {
    descriptor: ROOT_DESCRIPTOR_GRPC_CLIENT_STREAMING,
    descMap: getDescriptorMapGrpcClientStreaming()
}
service "HelloWorld" on new grpc:Listener(9090) {
    remote function lotsOfGreetings(stream<string, grpc:Error?> clientStream)
                                    returns string|error {
        log:printInfo("Client connected successfully.");
        // Reads and processes each message in the client stream.
        check clientStream.forEach(isolated function(string name) {
            log:printInfo("Greet received: " + name);
        });
        // Once the client sends a notification to indicate the end of the stream, '()' is returned by the stream.
        return "Ack";
    }
}
```

#### Output

```go
# Create a Ballerina package.
# Copy the generated `grpc_client_streaming_pb.bal` stub file to the package.
# For example, if you create a package named `service`, copy the stub file to the `service` package.

# Create a new `grpc_client_streaming.bal` Ballerina file inside the `service` package and add the service implementation.

# Execute the command below to build the 'service' package.
bal build service

# Run the service using the command below.
bal run service/target/bin/service.jar
```

***

```go
// This is the client implementation of the client streaming scenario.
import ballerina/io;

// Creates a gRPC client to interact with the remote server.
HelloWorldClient ep = check new("http://localhost:9090");

public function main () returns error? {
    // Executes the client-streaming RPC call and receives the streaming client.
    LotsOfGreetingsStreamingClient streamingClient = check
    ep->lotsOfGreetings();

    // Sends multiple messages to the server.
    string[] requests = ["Hi Sam", "Hey Sam", "GM Sam"];
    foreach var greet in requests {
        check streamingClient->sendString(greet);
    }

    // Once all the messages are sent, the server notifies the caller with a `complete` message.
    check streamingClient->complete();

    // Receives the server response.
    string? response = check streamingClient->receiveString();
    io:println(response);

}
```

#### Output

```go
# Create a Ballerina package.
# Copy the generated `grpc_client_streaming_pb.bal` stub file to the package.
# For example, if you create a package named `client`, copy the stub file to the `client` package.

# Create a new `grpc_client_streaming_client.bal` Ballerina file inside the `client` package and add the client implementation.

# Execute the command below to build the 'client' package.
bal build client

# Run the client using the command below.
bal run client/target/bin/client.jar
```
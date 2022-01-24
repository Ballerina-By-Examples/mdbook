# Bidirectional Streaming RPC

 The gRPC Server Connector exposes the gRPC service over HTTP2.
 This example demonstrates how a gRPC bidirectional streaming service and a client
 operate when each of them sends a sequence of messages using a read-write stream. 
 In such scenarios, the two streams operate independently. Therefore, clients and servers can read and write in any order.<br/><br/>
 For more information on the underlying module, 
 see the [GRPC module](https:docs.central.ballerina.io/ballerina/grpc/latest/).

```go
# Create new Protocol Buffers definition file `grpc_bidirectional_streaming.proto` and add service definition.
# Run the command below in the Ballerina tools distribution for stub generation.
bal grpc --input grpc_bidirectional_streaming.proto  --output stubs

# Once you run the command, `grpc_bidirectional_streaming_pb.bal` file is generated inside stubs directory.

# For more information on how to use the Ballerina Protocol Buffers tool, see the [Proto To Ballerina](https://ballerina.io/learn/by-example/proto-to-ballerina.html) example.
```

***

```go
// This is the server implementation of the bidirectional streaming scenario.
import ballerina/grpc;

@grpc:ServiceDescriptor {
    descriptor: ROOT_DESCRIPTOR_GRPC_BIDIRECTIONAL_STREAMING,
    descMap: getDescriptorMapGrpcBidirectionalStreaming()
}
service "Chat" on new grpc:Listener(9090) {
    remote function chat(ChatStringCaller caller,
                    stream<ChatMessage, error?> clientStream) returns error? {
        // Reads and processes each message in the client stream.
        check clientStream.forEach(function(ChatMessage chatMsg) {
            checkpanic caller->sendString(
                                string `${chatMsg.name}: ${chatMsg.message}`);
        });
        // Once the client sends a notification to indicate the end of the stream, '()' is returned by the stream.
        check caller->complete();
    }
}
```

#### Output

```go
# Create a Ballerina package.
# Copy the generated `grpc_bidirectional_streaming_pb.bal` stub file to the package.
# For example, if you create a package named `service`, copy the stub file to the `service` package.

# Create a new `grpc_bidirectional_streaming.bal` Ballerina file inside the `service` package and add the service implementation.

# Execute the command below to build the 'service' package.
bal build service

# Run the service using the command below.
bal run service/target/bin/service.jar
```

***

```go
// This is the client implementation of the bidirectional streaming scenario.
import ballerina/io;

// Creates a gRPC client to interact with the remote server.
ChatClient ep = check new("http://localhost:9090");

public function main () returns error? {
    // Executes the RPC call and receives the customized streaming client.
    ChatStreamingClient streamingClient = check ep->chat();

    // Reads server responses in another strand.
    future<error?> f1 = start readResponse(streamingClient);

    // Sends multiple messages to the server.
    ChatMessage[] messages = [
        {name: "Sam", message: "Hi"},
        {name: "Ann", message: "Hey"},
        {name: "John", message: "Hello"}
    ];
    foreach ChatMessage msg in messages {
        check streamingClient->sendChatMessage(msg);
    }
    // Once all the messages are sent, the client sends the message to notify the server about the completion.
    check streamingClient->complete();

    // Waits until all server messages are received.
    check wait f1;
}

function readResponse(ChatStreamingClient streamingClient) returns error? {
    // Receives the server stream response iteratively.
    string? result = check streamingClient->receiveString();
    while !(result is ()) {
        io:println(result);
        result = check streamingClient->receiveString();
    }
}
```

#### Output

```go
# Create a Ballerina package.
# Copy the generated `grpc_bidirectional_streaming_pb.bal` stub file to the package.
# For example, if you create a package named `client`, copy the stub file to the `client` package.

# Create a new `grpc_bidirectional_streaming_client.bal` Ballerina file inside the `client` package and add the client implementation.

# Execute the command below to build the 'client' package.
bal build client

# Run the client using the command below.
bal run client/target/bin/client.jar
```
# Server Streaming RPC

 The gRPC Server Connector is used to expose gRPC services over HTTP/2.
 This example includes a gRPC server streaming service and a client. The
 client sends a request to the server and gets a stream to read the messages until all the messages are read.<br/><br/>
 For more information on the underlying module, 
 see the [GRPC module](https:docs.central.ballerina.io/ballerina/grpc/latest/).

```go
# Create new Protocol Buffers definition file `grpc_server_streaming.proto` and add service definition.
# Run the command below in the Ballerina tools distribution for stub generation.
bal grpc --input grpc_server_streaming.proto  --output stubs

# Once you run the command, `grpc_server_streaming_pb.bal` file is generated inside stubs directory.

# For more information on how to use the Ballerina Protocol Buffers tool, see the [Proto To Ballerina](https://ballerina.io/learn/by-example/proto-to-ballerina.html) example.
```

***

```go
// This is the server implementation of the server streaming scenario.
import ballerina/grpc;
import ballerina/log;

@grpc:ServiceDescriptor {
    descriptor: ROOT_DESCRIPTOR_GRPC_SERVER_STREAMING,
    descMap: getDescriptorMapGrpcServerStreaming()
}
service "HelloWorld" on new grpc:Listener(9090) {
    remote function lotsOfReplies(string name)
                        returns stream<string, error?>|error {
        log:printInfo("Server received hello from " + name);
        string[] greets = ["Hi", "Hey", "GM"];
        // Creates the array of responses by appending the received name.
        int i = 0;
        foreach string greet in greets {
            greets[i] = greet + " " + name;
            i += 1;
        }
        // Returns the stream of messages back to the client.
        return greets.toStream();
    }
}
```

#### Output

```go
# Create a Ballerina package.
# Copy the generated `grpc_server_streaming_pb.bal` stub file to the package.
# For example, if you create a package named `service`, copy the stub file to the `service` package.

# Create a new `grpc_server_streaming.bal` Ballerina file inside the `service` package and add the service implementation.

# Execute the command below to build the 'service' package.
bal build service

# Run the service using the command below.
bal run service/target/bin/service.jar
```

***

```go
// This is the client implementation for the server streaming scenario.
import ballerina/grpc;
import ballerina/io;

// Creates a gRPC client to interact with the remote server.
HelloWorldClient ep = check new("http://localhost:9090");

public function main () returns error? {
    // Executes the streaming RPC call and gets the response as a stream.
    stream<string, grpc:Error?> result = check ep->lotsOfReplies("WSO2");
    // Iterates through the stream and prints the content.
    check result.forEach(function(string str) {
        io:println(str);
    });
}
```

#### Output

```go
# Create a Ballerina package.
# Copy the generated `grpc_server_streaming_pb.bal` stub file to the package.
# For example, if you create a package named `client`, copy the stub file to the `client` package.

# Create a new `grpc_server_streaming_client.bal` Ballerina file inside the `client` package and add the client implementation.

# Execute the command below to build the 'client' package.
bal build client

# Run the client using the command below.
bal run client/target/bin/client.jar
```
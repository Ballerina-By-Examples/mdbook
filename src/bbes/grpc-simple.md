# Simple RPC

 The gRPC Server Connector exposes the gRPC service over HTTP2.
 This example demonstrates how the gRPC simple service interacts with the gRPC client.<br/><br/>
 For more information on the underlying module, 
 see the [GRPC module](https:docs.central.ballerina.io/ballerina/grpc/latest/).

```go
# Create a new Protocol Buffers definition file named `grpc_simple.proto` and add the service definition.
# Run the command below from the Ballerina tools distribution for stub generation.
`bal grpc --input grpc_simple.proto  --output stubs`

# Once you run the command, the `grpc_simple_pb.bal` file is generated inside the `stubs` directory.

# For more information on how to use the Ballerina Protocol Buffers tool, see the [Proto To Ballerina](https://ballerina.io/learn/by-example/proto-to-ballerina.html) example.
```

***

```go
// This is the server implementation of the simple RPC scenario.
import ballerina/grpc;

@grpc:ServiceDescriptor {
    descriptor: ROOT_DESCRIPTOR_GRPC_SIMPLE,
    descMap: getDescriptorMapGrpcSimple()
}
service "HelloWorld" on new grpc:Listener(9090) {

    remote function hello(string request) returns string|error {
        // Reads the request message and sends a response.
        return "Hello " + request;
    }
}
```

#### Output

```go
# Create a Ballerina package.
# Copy the generated `grpc_simple_pb.bal` stub file to the package.
# For example, if you create a package named `service`, copy the stub file to the `service` package.

# Create a new `grpc_simple.bal` Ballerina file inside the `service` package and add the service implementation.

# Execute the command below to build the 'service' package.
`bal build service`

# Run the service using the command below.
bal run service/target/bin/service.jar
```

***

```go
// This is the client implementation of the simple RPC scenario.
import ballerina/io;

// Creates a gRPC client to interact with the remote server.
HelloWorldClient ep = check new("http://localhost:9090");

public function main () returns error? {
    // Executes a simple remote call.
    string result = check ep->hello("WSO2");
    // Prints the received result.
    io:println(result);
}
```

#### Output

```go
# Create a Ballerina package.
# Copy the generated `grpc_unary_blocking_pb.bal` stub file to the package.
# For example, if you create a package named `client`, copy the stub file to the `client` package.

# Create a new `grpc_unary_blocking_client.bal` Ballerina file inside the `client` package and add the client implementation.

# Execute the command below to build the 'client' package.
bal build client

# Run the client using the command below.
bal run client/target/bin/client.jar
```
# Simple RPC With Headers

 The gRPC Server Connector exposes the gRPC service over HTTP2.
 This example demonstrates how the gRPC simple service interacts with the gRPC client, and how
 header values are handled.<br/><br/>
 For more information on the underlying module, 
 see the [GRPC module](https:docs.central.ballerina.io/ballerina/grpc/latest/).

```go
# Create a new Protocol Buffers definition file named `grpc_simple_with_headers.proto` and add the service definition.
# Run the command below in the Ballerina tools distribution for stub generation.
`bal grpc --input grpc_simple_with_headers.proto  --output stubs`

# Once you run the command, the `grpc_simple_with_headers_pb.bal` file is generated inside the `stubs` directory.

# For more information on how to use the Ballerina Protocol Buffers tool, see the [Proto To Ballerina](https://ballerina.io/learn/by-example/proto-to-ballerina.html) example.
```

***

```go
// This is the server implementation of the simple RPC scenario.
import ballerina/grpc;
import ballerina/log;
import ballerina/protobuf.types.wrappers;

@grpc:ServiceDescriptor {
    descriptor: ROOT_DESCRIPTOR_GRPC_SIMPLE_WITH_HEADERS,
    descMap: getDescriptorMapGrpcSimpleWithHeaders()
}
service "HelloWorld" on new grpc:Listener(9090) {

    remote function hello(wrappers:ContextString request)
                        returns wrappers:ContextString|error {
        // Reads the request message and creates a response.
        string message = "Hello " + request.content;

        // Reads the header value in the request message by passing the request header map and header key.
        string reqHeader = check grpc:getHeader(request.headers,
                "client_header_key");
        log:printInfo("Server received header value: " + reqHeader);

        // Sends the response with the header.
        return {content: message, headers: {server_header_key:
        "Response Header value"}};
    }
}
```

#### Output

```go
# Create a Ballerina package.
# Copy the generated `grpc_simple_with_headers_pb.bal` stub file to the package.
# For example, if you create a package named `service`, copy the stub file to the `service` package.

# Create a new `grpc_simple_with_headers.bal` Ballerina file inside the `service` package and add the service implementation.

# Execute the command below to build the 'service' package.
`bal build service`

# Run the service using the command below.
`bal run service/target/bin/service.jar`
```

***

```go
// This is the client implementation of the simple RPC scenario.
import ballerina/grpc;
import ballerina/io;
import ballerina/protobuf.types.wrappers;

// Creates a gRPC client to interact with the remote server.
HelloWorldClient ep = check new("http://localhost:9090");

public function main () returns error? {
    // Creates the request message with the header value.
    wrappers:ContextString requestMessage =
    {content: "WSO2", headers: {client_header_key: "0987654321"}};

    // Executes a simple remote call.
    wrappers:ContextString result = check ep->helloContext(requestMessage);

    // Prints the received result.
    io:println(result.content);

    // Reads the header value in the response message and prints it.
    io:println(check grpc:getHeader(result.headers, "server_header_key"));
}
```

#### Output

```go
# Create a Ballerina package.
# Copy the generated `grpc_simple_with_headers_pb.bal` stub file to the package.
# For example, if you create a package named `client`, copy the stub file to the `client` package.

# Create a new `grpc_simple_with_headers_client.bal` Ballerina file inside the `client` package and add the client implementation.

# Execute the command below to build the 'client' package.
`bal build client`

# Run the client using the command below.
`bal run client/target/bin/client.jar`
```
# Client - Bearer Token Auth

 A client, which is secured with Bearer token auth can be used to connect to
 a secured service.<br/>
 The client metadata is enriched with the `Authorization: Bearer <token>`
 header by passing the `grpc:BearerTokenConfig` for the `auth` configuration
 of the client.

```go
# Create a new Protocol Buffers definition file named `grpc_client.proto` and add the service definition to it.
# Run the command below in the Ballerina tools distribution for stub generation.
bal grpc --input grpc_client.proto --output stubs

# Once you run the command, `grpc_client_pb.bal` file is generated inside stubs directory.

# For more information on how to use the Ballerina Protocol Buffers tool, see the [Proto To Ballerina](https://ballerina.io/learn/by-example/proto-to-ballerina.html) example.
```

***

```go
import ballerina/io;

// Defines the gRPC client to call the secured APIs.
// The client metadata is enriched with the `Authorization: Bearer <token>`
// header by passing the [`grpc:BearerTokenConfig`](https://docs.central.ballerina.io/ballerina/grpc/latest/records/BearerTokenConfig) for the `auth` configuration
// of the client.
HelloWorldClient securedEP = check new("https://localhost:9090",
    auth = {
        token: "56ede317-4511-44b4-8579-a08f094ee8c5"
    },
    secureSocket = {
        cert: "../resource/path/to/public.crt"
    }
);

public function main() returns error? {
    string result = check securedEP->hello();
    io:println(result);
}
```

#### Output

```go
# Create a Ballerina package.
# Copy the generated `grpc_secured_pb.bal` stub file to the package.
# For example, if you create a package named `client`, copy the stub file to the `client` package.

# Create a new `grpc_client_bearer_token_auth.bal` Ballerina file inside the `client` package and add the client implementation.

# Execute the command below to build the 'client' package.
# You may need to change the trusted certificate file path.
`bal build client`

# Run the client using the command below.
# As a prerequisite, start a secured sample service.
bal run client/target/bin/client.jar
Hello, World!
```
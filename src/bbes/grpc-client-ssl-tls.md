# Client - SSL/TLS

 You can use the gRPC client to connect or interact with a gRPC listener
 secured with SSL/TLS.
 Provide the `grpc:ClientSecureSocket` configurations to the client to
 initiate an HTTPS connection over HTTP/2.<br/><br/>
 For more information on the underlying module,
 see the [gRPC module](https:docs.central.ballerina.io/ballerina/grpc/latest/).

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

// A gRPC client can be configured to communicate through SSL/TLS as well.
// To secure a client using SSL/TLS, the client needs to be configured with
// a certificate file of the listener.
// The [`grpc:ClientSecureSocket`](https://docs.central.ballerina.io/ballerina/grpc/latest/records/ClientSecureSocket) record
// provides the SSL-related configurations of the client.
HelloWorldClient securedEP = check new("https://localhost:9090",
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

# Create a new `grpc_client_ssl_tls.bal` Ballerina file inside the `client` package and add the client implementation.

# Execute the command below to build the 'client' package.
# You may need to change the trusted certificate file path.
`bal build client`

# Run the client using the command below.
# As a prerequisite, start a sample service secured with SSL.
bal run client/target/bin/client.jar
Hello, World!
```
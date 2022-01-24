# Client - OAuth2 JWT Bearer Grant Type

 A client, which is secured with an OAuth2 JWT bearer grant type can be
 used to connect to a secured service.<br/>
 The client metadata is enriched with the `Authorization: Bearer <token>`
 header by passing the `grpc:OAuth2JwtBearerGrantConfig` to the `auth`
 configuration of the client.<br/><br/>
 For more information on the underlying module,
 see the [OAuth2 module](https:docs.central.ballerina.io/ballerina/oauth2/latest/).

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

// Defines the gRPC client to call the OAuth2 secured APIs.
// The client metadata is enriched with the `Authorization: Bearer <token>`
// header by passing the [`grpc:OAuth2JwtBearerGrantConfig`](https://docs.central.ballerina.io/ballerina/grpc/latest/records/OAuth2JwtBearerGrantConfig) for the `auth`
// configuration of the client.
HelloWorldClient securedEP = check new("https://localhost:9090",
    auth = {
        tokenUrl: "https://localhost:9445/oauth2/token",
        assertion: "eyJhbGciOiJFUzI1NiIsImtpZCI6Ij[...omitted for brevity...]",
        clientId: "FlfJYKBD2c925h4lkycqNZlC2l4a",
        clientSecret: "PJz0UhTJMrHOo68QQNpvnqAY_3Aa",
        scopes: ["admin"],
        clientConfig: {
            secureSocket: {
                cert: "../resource/path/to/public.crt"
            }
        }
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

# Create a new `grpc_client_oauth2_jwt_bearer_grant_type.bal` Ballerina file inside the `client` package and add the client implementation.

# Execute the command below to build the 'client' package.
# You may need to change the trusted certificate file path.
`bal build client`

# Run the client using the command below.
# As a prerequisite, start a sample service secured with OAuth2.
bal run client/target/bin/client.jar
Hello, World!
```
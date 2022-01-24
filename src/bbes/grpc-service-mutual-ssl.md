# Service - Mutual SSL

 Ballerina supports mutual SSL, which is a certificate-based authentication
 process in which two parties (the client and server) authenticate each other by
 verifying the digital certificates. It ensures that both parties are assured
 of each other's identity.<br/><br/>
 For more information on the underlying module, 
 see the [gRPC module](https:docs.central.ballerina.io/ballerina/grpc/latest/).

```go
# Create a new Protocol Buffers definition file named `grpc_service.proto` and add the service definition to it.
# Run the command below in the Ballerina tools distribution for stub generation.
bal grpc --input grpc_service.proto --output stubs

# Once you run the command, `grpc_service_pb.bal` file is generated inside stubs directory.

# For more information on how to use the Ballerina Protocol Buffers tool, see the [Proto To Ballerina](https://ballerina.io/learn/by-example/proto-to-ballerina.html) example.
```

***

```go
import ballerina/grpc;

// A gRPC listener can be configured to accept new connections that are
// secured via mutual SSL.
// The [`grpc:ListenerSecureSocket`](https://docs.central.ballerina.io/ballerina/grpc/latest/records/ListenerSecureSocket) record provides the SSL-related listener configurations.
listener grpc:Listener securedEP = new(9090,
    secureSocket = {
        key: {
            certFile: "../resource/path/to/public.crt",
            keyFile: "../resource/path/to/private.key"
        },
        // Enables mutual SSL.
        mutualSsl: {
            verifyClient: grpc:REQUIRE,
            cert: "../resource/path/to/public.crt"
        },
        // Enables the preferred SSL protocol and its versions.
        protocol: {
            name: grpc:TLS,
            versions: ["TLSv1.2", "TLSv1.1"]
        },
        // Configures the preferred ciphers.
        ciphers: ["TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA"]

    }
);

@grpc:ServiceDescriptor {
    descriptor: ROOT_DESCRIPTOR_GRPC_SERVICE,
    descMap: getDescriptorMapGrpcService()
}
service "HelloWorld" on securedEP {
    remote function hello() returns string {
        return "Hello, World!";
    }
}
```

#### Output

```go
# Create a Ballerina package.
# Copy the generated `grpc_secured_pb.bal` stub file to the package.
# For example, if you create a package named `service`, copy the stub file to the `service` package.

# Create a new `grpc_service_mutual_ssl.bal` Ballerina file inside the `service` package and add the service implementation.

# Execute the command below to build the 'service' package.
# You may need to change the certificate file path, private key file path, and
# trusted certificate file path.
`bal build service`

# Run the service using the command below.
bal run service/target/bin/service.jar
```
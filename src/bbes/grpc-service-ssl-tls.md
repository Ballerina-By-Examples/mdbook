# Service - SSL/TLS

 You can use the gRPC listener to connect to or interact with a gRPC client
 secured with SSL/TLS.
 Provide the `grpc:ListenerSecureSocket` configurations to the server to
 expose an HTTPS connection over HTTP/2.<br/><br/>
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

// A gRPC listener can be configured to communicate through SSL/TLS as well.
// To secure a listener using SSL/TLS, the listener needs to be configured
// with a certificate file and a private key file for the listener.
// The [`grpc:ListenerSecureSocket`](https://docs.central.ballerina.io/ballerina/grpc/latest/records/ListenerSecureSocket) record
// provides the SSL-related listener configurations of the listener.
listener grpc:Listener securedEP = new(9090,
    secureSocket = {
        key: {
            certFile: "./resources/public.crt",
            keyFile: "./resources/private.key"
        }
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

# Create a new `grpc_service_ssl_tls.bal` Ballerina file inside the `service` package and add the service implementation.

# Execute the command below to build the 'service' package.
# You may need to change the certificate file path and private key file path.
`bal build service`

# Run the service using the command below.
bal run service/target/bin/service.jar
```
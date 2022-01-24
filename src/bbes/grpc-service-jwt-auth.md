# Service - JWT Auth

 A gRPC service/resource can be secured using JWT and by enforcing
 authorization optionally. Then, it validates the JWT sent in the
 `Authorization` metadata against the provided configurations.<br/>
 Ballerina uses the concept of scopes for authorization. A resource declared
 in a service can be bound to one/more scope(s). The scope can be included
 in the JWT using a custom claim attribute. That custom claim attribute
 also can be configured as the `scopeKey`.<br/>
 In the authorization phase, the scopes of the service/resource are compared
 against the scope included in the JWT for at least one match between the two
 sets.<br/><br/>
 For more information on the underlying module, 
 see the [JWT module](https:docs.central.ballerina.io/ballerina/jwt/latest/).

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

listener grpc:Listener securedEP = new(9090,
    secureSocket = {
        key: {
            certFile: "../resource/path/to/public.crt",
            keyFile: "../resource/path/to/private.key"
        }
    }
);

// The service can be secured with JWT authentication and can be authorized
// optionally. JWT authentication can be enabled by setting the
// [`grpc:JwtValidatorConfig`](https://docs.central.ballerina.io/ballerina/grpc/latest/records/JwtValidatorConfig) configurations.
// Authorization is based on scopes. A scope maps to one or more groups.
// Authorization can be enabled by setting the `string|string[]` type
// configurations for `scopes` field.
@grpc:ServiceConfig {
    auth: [
        {
            jwtValidatorConfig: {
                issuer: "wso2",
                audience: "ballerina",
                signatureConfig: {
                    certFile: "../resource/path/to/public.crt"
                },
                scopeKey: "scp"
            },
            scopes: ["admin"]
        }
    ]
}
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

# Create a new `grpc_service_jwt_auth.bal` Ballerina file inside the `service` package and add the service implementation.

# Execute the command below to build the 'service' package.
# You may need to change the certificate file path and private key file path.
`bal build service`

# Run the service using the command below.
bal run service/target/bin/service.jar
```
# Service - Basic Auth File User Store

 A gRPC service/resource can be secured using Basic auth and optionally by
 enforcing authorization. Then, it validates the Basic auth token sent as the
 `Authorization` metadata against the provided configurations. This reads data
 from a file, which has a TOML format. This stores the usernames, passwords
 for authentication, and scopes for authorization.<br/>
 Ballerina uses the concept of scopes for authorization. A resource declared
 in a service can be bound to one/more scope(s).<br/>
 In the authorization phase, the scopes of the service/resource are compared
 against the scope included in the user store for at least one match between
 the two sets.<br/>
 `Config.toml` has defined three users - alice, ldclakmal, and eve. Each user has a
 password and optionally assigned scopes as an array.<br/><br/>
 For more information on the underlying module,
 see the [Auth module](https:docs.central.ballerina.io/ballerina/auth/latest/).

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

// The service can be secured with Basic auth and can be authorized optionally.
// Using Basic auth with the file user store can be enabled by setting the
// [`grpc:FileUserStoreConfig`](https://docs.central.ballerina.io/ballerina/grpc/latest/records/FileUserStoreConfig) configurations.
// Authorization is based on scopes. A scope maps to one or more groups.
// Authorization can be enabled by setting the `string|string[]` type
// configurations for `scopes` field.
@grpc:ServiceConfig {
    auth: [
        {
            fileUserStoreConfig: {},
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

# Create a new `grpc_service_basic_auth_file_user_store.bal` Ballerina file inside the `service` package and add the service implementation.

# As a prerequisite, ensure that the `Config.toml` file is populated correctly
# with the user information.
echo '[["ballerina.auth.users"]]
username="alice"
password="password1"
scopes=["scope1"]
[["ballerina.auth.users"]]
username="bob"
password="password2"
scopes=["scope2", "scope3"]' > Config.toml

# Execute the command below to build the 'service' package.
# You may need to change the certificate file path and private key file path.
`bal build service`

# Run the service using the command below.
bal run service/target/bin/service.jar
```
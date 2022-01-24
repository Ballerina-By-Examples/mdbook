# Service - JWT Auth

 A GraphQL service can be secured using JWT and by enforcing
 authorization optionally. Then, it validates the JWT sent in the
 `Authorization` header against the provided configurations.<br/>
 Ballerina uses the concept of scopes for authorization. A resource declared
 in a service can be bound to one/more scope(s). The scope can be included
 in the JWT using a custom claim attribute. That custom claim attribute
 also can be configured as the `scopeKey`.<br/>
 In the authorization phase, the scopes of the service are compared
 against the scope included in the JWT for at least one match between the two
 sets.<br/><br/>
 For more information on the underlying module, 
 see the [JWT module](https:docs.central.ballerina.io/ballerina/jwt/latest/).

```go
import ballerina/graphql;

listener graphql:Listener securedEP = new(9090,
    secureSocket = {
        key: {
            certFile: "../resource/path/to/public.crt",
            keyFile: "../resource/path/to/private.key"
        }
    }
);

// The service can be secured with JWT authentication and can be authorized
// optionally. JWT authentication can be enabled by setting the
// `graphql:JwtValidatorConfig` configurations.
// Authorization is based on scopes. A scope maps to one or more groups.
// Authorization can be enabled by setting the `string|string[]` type
// configurations for `scopes` field.
@graphql:ServiceConfig {
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
service /graphql on securedEP {
    resource function get greeting() returns string {
        return "Hello, World!";
    }
}
```

#### Output

```go
# You may need to change the certificate file path and private key file path.
bal run graphql_service_jwt_auth.bal
```
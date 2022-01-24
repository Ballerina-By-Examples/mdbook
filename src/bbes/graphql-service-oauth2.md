# Service - OAuth2

 A GraphQL service can be secured using OAuth2 and by enforcing
 authorization optionally. Then, it validates the OAuth2 token sent in the
 `Authorization` header against the provided configurations. This calls the
 configured introspection endpoint to validate.<br/>
 Ballerina uses the concept of scopes for authorization. A resource declared
 in a service can be bound to one/more scope(s). The scope can be included
 in the introspection response using a custom claim attribute. That custom
 claim attribute also can be configured as the `scopeKey`.<br/>
 In the authorization phase, the scopes of the service are compared
 against the scope included in the introspection response for at least one
 match between the two sets.<br/><br/>
 For more information on the underlying module,
 see the [OAuth2 module](https:docs.central.ballerina.io/ballerina/oauth2/latest/).

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

// The service can be secured with OAuth2 authentication and can be authorized
// optionally. OAuth2 authentication can be enabled by setting the
// `graphql:OAuth2IntrospectionConfig` configurations.
// Authorization is based on scopes. A scope maps to one or more groups.
// Authorization can be enabled by setting the `string|string[]` type
// configurations for `scopes` field.
@graphql:ServiceConfig {
    auth: [
        {
            oauth2IntrospectionConfig: {
                url: "https://localhost:9445/oauth2/introspect",
                tokenTypeHint: "access_token",
                scopeKey: "scp",
                clientConfig: {
                    customHeaders: {"Authorization": "Basic YWRtaW46YWRtaW4="},
                    secureSocket: {
                        cert: "../resource/path/to/public.crt"
                    }
                }
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
bal run graphql_service_oauth2.bal
```
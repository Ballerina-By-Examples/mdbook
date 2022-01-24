# Service - Basic Auth File User Store

 A GraphQL service can be secured using Basic auth and optionally by
 enforcing authorization. Then, it validates the Basic auth token sent in the
 `Authorization` header against the provided configurations. This reads data
 from a file, which has a TOML format. This stores the usernames, passwords
 for authentication, and scopes for authorization.<br/>
 Ballerina uses the concept of scopes for authorization. A resource declared
 in a service can be bound to one/more scope(s).<br/>
 In the authorization phase, the scopes of the service are compared
 against the scope included in the user store for at least one match between
 the two sets.<br/>
 `Config.toml` has defined three users - alice, ldclakmal and eve. Each user has a
 password and optionally assigned scopes as an array.<br/><br/>
 For more information on the underlying module,
 see the [Auth module](https:docs.central.ballerina.io/ballerina/auth/latest/).

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

// The service can be secured with Basic auth and can be authorized optionally.
// Using Basic auth with the file user store can be enabled by setting the
// `graphql:FileUserStoreConfig` configurations.
// Authorization is based on scopes. A scope maps to one or more groups.
// Authorization can be enabled by setting the `string|string[]` type
// configurations for `scopes` field.
@graphql:ServiceConfig {
    auth: [
        {
            fileUserStoreConfig: {},
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

# You may need to change the certificate file path and private key file path.
bal run graphql_service_basic_auth_file_user_store.bal
```
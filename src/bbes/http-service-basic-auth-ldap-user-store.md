# Service - Basic Auth LDAP User Store

 An HTTP service/resource can be secured using Basic auth and by enforcing
 authorization optionally. Then, it validates the Basic auth token sent in
 the `Authorization` header against the provided configurations. This reads
 data from the configured LDAP. This stores usernames, passwords for
 authentication, and scopes for authorization.<br/>
 Ballerina uses the concept of scopes for authorization. A resource declared
 in a service can be bound to one/more scope(s).<br/>
 In the authorization phase, the scopes of the service/resource are compared
 against the scope included in the user store for at least one match between
 the two sets.<br/><br/>
 For more information on the underlying module,
 see the [Auth module](https:docs.central.ballerina.io/ballerina/auth/latest/).

```go
import ballerina/http;

listener http:Listener securedEP = new(9090,
    secureSocket = {
        key: {
            certFile: "../resource/path/to/public.crt",
            keyFile: "../resource/path/to/private.key"
        }
    }
);

// The service can be secured with Basic auth and can be authorized  optionally.
// Basic auth using the LDAP user store can be enabled by setting the
// [`http:LdapUserStoreConfig`](https://docs.central.ballerina.io/ballerina/http/latest/records/LdapUserStoreConfig) configurations.
// Authorization is based on scopes. A scope maps to one or more groups.
// Authorization can be enabled by setting the `string|string[]` type
// configurations for `scopes` field.
@http:ServiceConfig {
    auth: [
        {
            ldapUserStoreConfig: {
                domainName: "avix.lk",
                connectionUrl: "ldap://localhost:389",
                connectionName: "cn=admin,dc=avix,dc=lk",
                connectionPassword: "avix123",
                userSearchBase: "ou=Users,dc=avix,dc=lk",
                userEntryObjectClass: "inetOrgPerson",
                userNameAttribute: "uid",
                userNameSearchFilter: "(&(objectClass=inetOrgPerson)(uid=?))",
                userNameListFilter: "(objectClass=inetOrgPerson)",
                groupSearchBase: ["ou=Groups,dc=avix,dc=lk"],
                groupEntryObjectClass: "groupOfNames",
                groupNameAttribute: "cn",
                groupNameSearchFilter: "(&(objectClass=groupOfNames)(cn=?))",
                groupNameListFilter: "(objectClass=groupOfNames)",
                membershipAttribute: "member",
                userRolesCacheEnabled: true,
                connectionPoolingEnabled: false,
                connectionTimeout: 5,
                readTimeout: 60
            },
            scopes: ["admin"]
        }
    ]
}
service /foo on securedEP {

    // It is optional to override the authentication and authorization
    // configurations at the resource levels. Otherwise, the service auth
    // configurations will be applied automatically to the resources as well.
    resource function get bar() returns string {
        return "Hello, World!";
    }
}
```

#### Output

```go
# You may need to change the certificate file path and private key file path.
bal run http_service_basic_auth_ldap_user_store.bal
```
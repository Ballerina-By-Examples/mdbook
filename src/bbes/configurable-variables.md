# Configurable Variables

 A module-level variable can be declared as `configurable`. The initializer of a `configurable` variable
 can be overridden at runtime (e.g., by a TOML file). A variable where configuration is required
 can use an initializer of `?`. The type of a `configurable` variable must be subtype of `anydata`.<br/><br/>
 For more information, see [Making Ballerina Programs Configurable](https:ballerina.io/learn/making-ballerina-programs-configurable/defining-configurable-variables/).

```go
// Port on which to run the service.
configurable int port = 8080;

//`configurable string password = ?;`
//
// This specifies that the password must be supplied in a configuration file.
```

#### Output

```go
bal run configurable_variables.bal
```
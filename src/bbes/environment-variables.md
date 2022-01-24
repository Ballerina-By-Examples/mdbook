# Environment Variables

 The `os` library provides functions to retrieve information about the OS and the current users of the OS.<br/><br/>
 For more information on the underlying module,
 see the [OS module](https:docs.central.ballerina.io/ballerina/os/latest/).

```go
import ballerina/io;
import ballerina/os;

public function main() {
    // Returns the environment variable value associated with the `HTTP_PORT`.
    string port = os:getEnv("HTTP_PORT");
    io:println("HTTP_PORT: ", port);

    // Returns the username of the current user.
    string username = os:getUsername();
    io:println("Username: ", username);

    // Returns the current user's home directory path.
    string userHome = os:getUserHome();
    io:println("Userhome: ", userHome);
}
```

#### Output

```go
bal run environment_variables.bal
HTTP_PORT: 5005
Username: Alex
Userhome: /Users/Alex
```
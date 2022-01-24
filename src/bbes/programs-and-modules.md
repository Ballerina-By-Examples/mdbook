# Programs and Modules

 Every Ballerina program consists of modules. Modules are one or more `.bal` files. 
 The module names take the form `org/x.y.z`.

```go
// This import declaration binds the prefix `io` to the `ballerina/io` module. 
// The prefix by default comes form the last part of the module name.
// The `ballerina` org name is reserved for the standard library modules.
import ballerina/io;

// `main` function is the program entry point. 
// `public` makes function visible outside the module.
public function main() {
    // Here `io:println` means function `println` is in the module bound to prefix `io`.
    io:println("Hello, World!");

}
```

#### Output

```go
bal run programs_and_modules.bal
Hello, World!
```
# Module Lifecycle

 All modules are initialized at program startup. Module initialization is ordered so that if module A imports module B,
 then module A is initialized after module B. The initialization phase ends by calling the `main` function if there is one. <br/><br/>
 A module's listeners are registered during module initialization.
 If there are registered listeners, then the initialization phase is followed by the listening phase. <br/><br/>
 The listening phase starts by calling the `start` method on each registered listener. The listening phase is terminated by signal (e.g. `SIGINT`, `SIGTERM`).

```go
import ballerina/io;

// Usually it is an error to import a module without using it, but if you want to import a module because of what its initialization does,
//  then use `as _` as in this example.
import ballerina/grpc as _;

// A module can have an `init` function just like an object. 
// The initialization of a module ends by called its `init` function if there is one.
function init() {
    io:println("Hello world");
}
```

#### Output

```go
bal run module_lifecycle.bal
Hello world
```
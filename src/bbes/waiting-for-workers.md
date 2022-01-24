# Waiting for Workers

 Named workers can continue to execute after the function's default worker
 terminates and the function returns.
 A worker (function or named) can use `wait` to wait for a named worker.

```go
import ballerina/io;

public function main() {
    io:println("Initializing");

    worker A {
        io:println("In worker A");
    }

    io:println("In function worker");

    // A worker (function or named) can use `wait` to wait for a named worker.
    wait A;

    io:println("After wait A");
}
```

#### Output

```go
bal run waiting_for_workers.bal
Initializing
In function worker
In worker A
After wait A
```
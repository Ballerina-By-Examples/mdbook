# Named Workers

 Normally all of a function's code belongs to the function's default worker, 
 which has a single logical thread of control.
 A function can also declare named workers, which run concurrently with the
 function's default worker and other named workers.
 Code before any named workers is executed before named workers start.
 Variables declared before all named workers and function parameters are
 accessible in named workers.

```go
import ballerina/io;

public function main() {
    // Code before any named workers is executed before named 
    // workers start.
    io:println("Initializing");
    final string greeting = "Hello";

    // A function can declare named workers, which run concurrently with the
    // function's default worker and other named workers.
    worker A {
        // Variables declared before all named workers and function 
        // parameters are accessible in named workers.
        io:println(greeting + " from worker A");

    }

    worker B {
        io:println(greeting + " from worker B");
    }

    io:println(greeting + " from function worker");
}
```

#### Output

```go
bal run named_workers.bal
Initializing
Hello from function worker
Hello from worker B
Hello from worker A
```
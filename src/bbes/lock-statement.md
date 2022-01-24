# Lock Statement

 The `lock` statement allows mutable state to be safely accessed from multiple strands that are running on
 separate threads. Semantics are like an atomic section: execution of outermost `lock` block is not
 interleaved. Naive implementation uses single, global, recursive lock. Efficient implementation can do
 compile-time lock inference.

```go
import ballerina/io;

int n = 0;

function inc() {
    // Locks the global variable `n` and increments it by 1.
    lock {
        n += 1;
    }

    io:println(n);
}

public function main() {
    inc();
}
```

#### Output

```go
bal run lock_statement.bal
1
```
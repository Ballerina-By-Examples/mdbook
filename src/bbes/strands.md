# Strands

 By default, named workers are multitasked cooperatively, not preemptively.
 Each named worker has a "strand" (logical thread of control) and execution
 switches between strands only at specific "yield" points such as doing a wait
 or when a library function invokes a system call that would block.
 This avoids the need for users to lock variables that are accessed from
 multiple named workers.
 An annotation can be used to make a strand run on a separate thread.

```go
import ballerina/io;

public function main() {
    // By default, named workers are multitasked cooperatively, not preemptively.
    // Each named worker has a "strand" (logical thread of control) and execution
    // switches between strands only at specific "yield" points.
    worker A {
        io:println("In worker A");
    }

    // An annotation can be used to make a strand run on a separate thread.
    @strand {
        thread: "any"
    }

    worker B {
        io:println("In worker B");
    }

    io:println("In function worker");
}
```

#### Output

```go
bal run strands.bal
In worker B
In function worker
In worker A
```
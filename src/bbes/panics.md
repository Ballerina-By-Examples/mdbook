# Panics

 Ballerina distinguishes normal errors from abnormal errors.
 Normal errors are handled by returning error values.
 Abnormal errors are handled using the panic statement.
 Abnormal errors should typically result in immediate program termination.
 e.g., A programming bug or out of memory.
 A panic has an associated error value.

```go
import ballerina/io;

// `n` must not be `0`.
function divide(int m, int n) returns int {

    if n == 0 {
        // Panic if `n` is `0`.
        panic error("division by 0");

    }
    return m/n;
}

public function main() {
    int x = divide(1, 0);

    // Since `divide(1, 0)` panics, the program will
    // terminate and the following code will not be
    // executed.
    io:println(x);

}
```

#### Output

```go
bal run panics.bal
error: division by 0
        at panics:divide(panics.bal:8)
           panics:main(panics.bal:15)
```
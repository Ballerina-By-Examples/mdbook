# Asynchronous Function Calls

 start calls a function asynchronously and the function runs on a separate logical thread ("strand"): cooperatively multitasked by default
 Result will be of type `future<T>` and `future` is a separate basic type.
 Waiting for the same future more than once gives an error.
 Use `f.cancel()` to terminate a future.

```go
import ballerina/io;

public function main() {
    // `start` calls a function asynchronously.
    future<int> fut = start foo();

    // `wait` for `future<T>` gives `T|error`.
    int|error x = wait fut;

    io:println(x);
}

function foo() returns int {
    return 10;
}
```

#### Output

```go
bal run asynchronous_function_calls.bal
10
```
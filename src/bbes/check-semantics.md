# Check Semantics

 `check` semantics is not simply to return on error.
 When `check` gets an error, it fails.
 Enclosing block decide how to handle failure.
 Most blocks pass failure up to enclosing block.
 Function definition handles failure by returning the error.
 `on fail` can catch the error.
 `fail` statement is like `check` but always fails.
 Differs from exceptions in that control flow is explicit

```go
import ballerina/io;

public function main() returns error? {
    do {
        // If either `foo()` or `bar()` invocations returns an `error`,
        // the error will be returned from the `main` function and execution
        // of the `main` function ends.
        check foo();
        check bar();

        if !isOK() {
            // Fails explicitly with an `error`.
            fail error("not OK");

        }
    }
    // Failure with the respective error is caught by the `on fail` block.
    on fail var e {
        io:println(e.toString());
        return e;
    }

    return;
}

function foo() returns error? {
    io:println("OK");
    return;
}

function bar() returns error? {
    io:println("OK");
    return;
}

function isOK() returns boolean {
    // Returns `false`.
    return false;

}
```

#### Output

```go
bal run check_semantics.bal
OK
OK
error("not OK")
error: not OK
```
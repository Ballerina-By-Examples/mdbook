# Errors

 Ballerina does not have exceptions. Errors are reported by functions returning
 error values.
 `error` is its own basic type.
 The return type of a function that may return an error value will be a union with error.
 An error value includes a `string` message.
 An error value includes stack trace from the point where `error(msg)` is called.
 Error values are immutable.

```go
import ballerina/io;

// Parses a string to convert to an integer value.
// This function may return error values.
// The return type is a union with the error.
function parse(string s) returns int|error {

    int n = 0;
    int[] cps = s.toCodePointInts();
    foreach int cp in cps {
        int p = cp - 0x30;
        if p < 0 || p > 9 {
            // If `p` is not a digit construct, it returns
            // an error value with "not a digit" as the error message.
            return error("not a digit");

        }
        n = n * 10 + p;
    }
    return n;
}

public function main() {
    // An `int` value is returned when the argument is a string,
    // which can be parsed successfully  as an integer.
    int|error x = parse("123");

    io:println(x);

    // An `error` value is returned when the argument is a string,
    // which has a character that is not a digit.
    int|error y = parse("1h");

    io:println(y);
}
```

#### Output

```go
bal run error_reporting.bal
123
error("not a digit")
```
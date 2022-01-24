# Check Expression

 `check E` is used with expression `E` that might result in an error.
 If `E` does result in an error, then check makes the function return that error
 immediately.
 Type of `check E` does not include error.
 The control flow remains explicit.

```go
import ballerina/io;

// Convert bytes to a string and then to an int.
function intFromBytes(byte[] bytes) returns int|error {

    // Use `check` with an expression that may return `error`.
    // If `string:fromBytes(bytes)` returns an error, `check`
    // makes the function return the error here.
    // If not, the returned string value is used as the 
    // value of the `str` variable.
    string str = check string:fromBytes(bytes);


    return int:fromString(str);
}

public function main() {
    int|error res = intFromBytes([104, 101, 108, 108, 111]);
    io:println(res);
}
```

#### Output

```go
bal run check_expression.bal
error("{ballerina/lang.int}NumberParsingError",message="'string' value 'hello' cannot be converted to 'int'")
```
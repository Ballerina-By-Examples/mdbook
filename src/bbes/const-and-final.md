# Const and Final 

 `const` means immutable and known at compile-time. Its type is singleton: set containing single value.
 A `variable` or a `class` field can be declared as `final`, meaning it cannot be assigned to, after
 it has been initialized.

```go
import ballerina/io;

// Constants can be defined without the type.
// Then the type is inferred from the right hand side.
const MAX_VALUE = 1000;
const URL = "https://ballerina.io";

// The value for variable `msg` can only be assigned once.
final string msg = loadMessage();

public function main() {
    io:println(MAX_VALUE);
    io:println(URL);
    io:println(msg);
}

function loadMessage() returns string {
    return "Hello World";
}
```

#### Output

```go
bal run const_and_final
1000
https://ballerina.io
Hello World
```
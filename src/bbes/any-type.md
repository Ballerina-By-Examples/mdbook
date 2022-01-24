# Any Type

 `any` means any value except an error.
 Equivalent to a union of all non-error basic types.
 Use `any|error` for absolutely any value.
 Langlib lang.value module contains functions that apply to multiple basic types.

```go
import ballerina/io;

// A variable of type `any` can hold any value except an error.
any x = 1;

public function main() {
    // Can cast `any` to specific type.
    int n = <int>x;
    
    io:println(n);

    // Langlib lang.value module contains functions that apply to multiple basic types.
    // Can convert to string.
    string s = x.toString();

    io:println(s == "1");

    // Can test its type with the `is` operator.
    float f = x is int|float ? <float>x : 0.0;

    io:println(f);
}
```

#### Output

```go
bal run any_type.bal
1
true
1.0
```
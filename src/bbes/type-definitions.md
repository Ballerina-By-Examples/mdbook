# Type Definitions

 A type definition gives a name for a type. Its name is just an alias for the type, like `typedef` in C.

```go
import ballerina/io;

// Defines a type named `MapArray`.
type MapArray map<string>[];

public function main() {
    // Creates a `MapArray` value.
    // `arr` has elements which are of `map<string>` type.
    MapArray arr = [
        {"x": "foo"},
        {"y": "bar"}
    ];

    io:println(arr[0]);
}
```

#### Output

```go
bal run type_definitions.bal
{"x":"foo"}
```
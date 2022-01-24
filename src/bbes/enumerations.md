# Enumerations

 `Enumerations` are shorthand for unions of `string` constants. A `const` can be used as a singleton type.
 An `enum` is not a distinct type. You can specify the string constants explicitly.

```go
import ballerina/io;

// This is shorthand for,
//
// `const RED = "RED";`
//
// `const GREEN = "GREEN";`
//
// `const BLUE = "BLUE";`
//
// `type Color RED|GREEN|BLUE;`
enum Color {
    RED, GREEN, BLUE
}

// An `enum` member can explicitly specify an associated expression.
enum Language {
    ENG = "English",
    TL = "Tamil",
    SI = "Sinhala"
}

public function main() {
    io:println(RED);
    io:println(ENG);
}
```

#### Output

```go
bal run enumerations.bal
RED
English
```
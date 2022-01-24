# Records

 A `record` type has specific named fields. Fields can be accessed with `r.x`. Records are mutable: `r.x` is an
 `lvalue`. Records can be constructed using a similar syntax to a `map`. Typically a `record` type is combined
 with a type definition. The name of the type is not significant: a `record` is just a collection of fields.
 Record equality works same as `map` equality.

```go
import ballerina/io;

// Defines a record type named `Coord`.
type Coord record {
    int x;
    int y;
};

public function main() {
    // Creates a `record`, specifying values for its fields.
    record { int x; int y; } r = {
        x: 1,
        y: 2
    };

    // Creates a `Coord` record.
    Coord c = {
        x: 1,
        y: 2
    };

    int a = r.y;
    io:println(a);

    int b = c.x;
    io:println(b);
}
```

#### Output

```go
bal run records.bal
2
1
```
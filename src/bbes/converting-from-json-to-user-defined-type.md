# Converting From JSON to User-Defined Type

 With mutable values, would not be type-safe to allow a cast. 
 Mutable structures have the `inherent` type that limits mutation.
 Cast to `T` will work on mutable structure `s` only if the `inherent` type
 of `s` is a subtype of `T`.
 Casting of immutable value will work but it does not do numeric conversions.

```go
import ballerina/io;

type Coord record {
    float x;
    float y;
};

public function main() {
    json j = {x: 1.0, y: 2.0};

    // With mutable values, it would not be type-safe to allow a cast.
    // Cast to `T` will work on the mutable structure `s` only if the inherent type
    // of `s` is a subtype of `T`.
    // Casting of immutable value will work.
    json k = j.cloneReadOnly();
    Coord c = <Coord> k;

    io:println(c.x);
    io:println(c.y);
}
```

#### Output

```go
bal run converting_from_json_to_user_defined_type.bal
1.0
2.0
```
# Converting to User-Defined Type

 The `cloneWithType` langlib function in the lang.value
 module can be used to convert a value to a user-defined type.
 Result recursively uses specified type as inherent type of new value.
 Automatically performs numeric conversions as necessary.
 Every part of value is cloned, including immutable structural values.
 Graph structure is not preserved. 
 Variant `fromJsonWithType` also does reverse of conversions done by 
 `toJson`.

```go
import ballerina/io;

type Coord record {
    float x;
    float y;
};

public function main() returns error? {
    json j = {x: 1.0, y: 2.0};

    // Argument is a `typedesc` value.
    // The static return type depends on the argument.
    Coord c = check j.cloneWithType(Coord);

    io:println(c.x);

    // Argument defaulted from the context.
    Coord d = check j.cloneWithType();

    io:println(d.x);
    return;
}
```

#### Output

```go
bal run converting_to_user_defined_type.bal
1.0
1.0
```
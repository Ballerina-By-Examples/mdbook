# Structural Typing

 Typing in Ballerina is structural: a type describes a set of values. Ballerina has semantic subtyping:
 subtype means subset. Universe of values is partitioned into basic types. Each value belongs to
 exactly one basic type. Can think of each value as being tagged with its basic type.
 There is a complexity in making structural typing work with mutation. <br/><br/>
 Immutable basic types (so far): `nil`, `boolean`, `int`, `float`, `string` <br/><br/>
 Mutable basic types (so far): `array`, `map`, and `record`

```go
import ballerina/io;

public function main() {
    // 1 belongs to `int`.
    io:println(1 is int);
    // [10, 20, 30] belongs to `int[]`.
    io:println([10, 20, 30] is int[]);

}
```

#### Output

```go
bal run structural_typing.bal
true
true
```
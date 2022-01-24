# Readonly Type

 The `readonly` type consists of values that are immutable. For structural type `T`, `T & readonly` means
 immutable `T`. `T & readonly` is subtype of `T` and subtype of `readonly`. Guaranteed that if declared
 type of a value is a subtype of `readonly`, then at runtime the value can never be mutated. It is enforced
 by runtime checks on the mutating structures. With `readonly` field, both the field and its value
 are immutable.

```go
import ballerina/io;

// A `const` is immutable.
const s = "Anne";

type Row record {
    // Both the field and its value are immutable.
    readonly string k;
    int value;

};

table<Row> key(k) t = table [
    { k: "John", value: 17 }
];

public function main() {
    // Can safely use `s` as a key.
    t.add({k: s, value: 18});

    io:println(t);
}
```

#### Output

```go
bal run readonly_type.bal
[{"k":"John","value":17},{"k":"Anne","value":18}]
```
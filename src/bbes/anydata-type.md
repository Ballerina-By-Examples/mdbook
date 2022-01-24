# Anydata Type

 The type for plain data is `anydata`. The subtype of `any`. `==` and `!=` operators tests for deep equality.
 `x.clone()` returns a deep copy, with the same mutability. `x.cloneReadOnly()` returns a deep copy that is
 immutable. Ballerina syntax uses `ReadOnly` to mean immutable. Both `x.clone` and `cloneReadOnly()` do
 not copy immutable parts of `x`. `const` structures are allowed. Equality and cloning handle cycles.

```go
import ballerina/io;

anydata x1 = [1, "string", true];
// `x1.clone()` returns a deep copy with the same mutability.
anydata x2 = x1.clone();

// Checks deep equality.
boolean eq = (x1 == x2);

public function main() {
    io:println(x2);
    io:println(eq);
}
```

#### Output

```go
bal run anydata_type.bal
[1,"string",true]
true
```
# Covariance

 Arrays and maps are covariant.
 Static type-checking guarantees that the result of a read from a mutable
 structure will be consistent with the static type.
 Covariance means that a write to a mutable structure may result in a 
 runtime error.
 Arrays, maps, and records have an "inherent" type that constrains mutation.

```go
int[] iv = [1, 2, 3];

// Assigning `int[]` to `any[]` is allowed.
// - set of values allowed by `int` is subset of set of values allowed by `any`
// - set of values allowed by `int[]` is subset of set of values allowed by `any[]`
any[] av = iv;

public function main() {
    // A runtime error or else `iv[0]` would have the wrong type.
    av[0] = "str";

}
```

#### Output

```go
bal run covariance.bal
error: {ballerina/lang.array}InherentTypeViolation {"message":"incompatible types: expected 'int', found 'string'"}
        at covariance:main(covariance.bal:10)
```
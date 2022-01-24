# Foreach Statement

 The `foreach` statement iterates over an iterable value, by binding a variable to each member of the
 iterable value in order. `foreach` also works for strings, and will iterate over each character of the `string`.

```go
import ballerina/io;

public function main() {
    float v1 = sum([10.5, 20.5, 30.5]);
    float v2 = sum2([10.5, 20.5, 30.5]);
    io:println("v1:", v1, " v2:", v2);
}

function sum(float[] v) returns float {
    float r = 0.0;
    // `foreach` statement can be used to iterate an `array`.
    // Each iteration returns an element in the `array`.
    foreach float x in v {
        r += x;
    }

    return r;
}

function sum2(float[] v) returns float {
    float r = 0.0;
    // `m ..< n` creates a value that when iterated over will give the
    // integers starting from `m` that are `< n`.
    foreach int i in 0 ..< v.length() {
        r += v[i];
    }

    return r;
}
```

#### Output

```go
bal run foreach_statement.bal
v1:61.5 v2:61.5
```
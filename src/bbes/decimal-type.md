# Decimal Type

 It is the third numeric type. Works like `int` and `float`. No implicit conversion.
 Represents `decimal` fractions exactly. Avoids surprises that you get with `float`. Preserves precision.
 Separate basic type; counts as `anydata`. Literal uses the suffix `d`(`f` suffix is for `float`).
 Floating point, not infinite precision.
 <ul>
 <li>34 decimal digits</li>
 <li>22 digits are enough for US national debt in `¢`</li>
 <li>27 digits are enough for an age of universe in `ns`</li>
 <li>No `infinity`, `NaN` or negative zero</li>
 </ul>

```go
import ballerina/io;

// The `decimal` type represents the set of 128-bits IEEE 754R decimal floating point numbers.
decimal nanos = 1d/1000000000d;

function floatSurprise() {
    float f = 100.10 - 0.01;
    io:println(f);
}

public function main() {
    floatSurprise();
    io:println(nanos);
}
```

#### Output

```go
bal run decimal_type.bal
100.08999999999999
1E-9
```
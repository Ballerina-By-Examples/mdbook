# Floating Point Numbers

 The `float` type is IEEE 64-bit binary floating point (same as `double` in Java) and supports the same arithmetic
 operators as `int`.

```go
import ballerina/io;

public function main() {
    float x = 1.0;

    int n = 5;

    // No implicit conversions between integers and floating point values are allowed.
    // You can use `<T>` for explicit conversions.
    float y = x + <float>n;

    io:println(y);
}
```

#### Output

```go
bal run floating_point_numbers.bal 
6.0
```
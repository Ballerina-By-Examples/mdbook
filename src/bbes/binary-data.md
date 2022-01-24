# Binary Data

 Binary data is represented by arrays of `byte` values. It is a special syntax for `byte` arrays
 in `base 64` and `base 16`. The relationship between `byte` and `int` is not the same as
 what you are used to. A `byte` is an `int` in the range `0` to `0xFF`. `byte` is a subtype of int.
 `int` type supports normal bitwise operators: `&` `|` `^` `~` `<<` `>>` `>>>`.
 Ballerina knows the obvious rules about when bitwise operations produce a `byte`.

```go
public function main() {
    // Creates a `byte` array using the `base64` byte array literal.
    byte[] _ = base64`yPHaytRgJPg+QjjylUHakEwz1fWPx/wXCW41JSmqYW8=`;

    // Creates a `byte` using a hexadecimal numeral.
    byte x = 0xA;

    // `byte & int` will be `byte`.
    byte _ = x & 0xFF;

}
```

#### Output

```go
bal run binary_data.bal
```
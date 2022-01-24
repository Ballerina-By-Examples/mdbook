# Nil

 Ballerina's version of `null` is called `nil` and written as `()`. 
 Ballerina types do not implicitly allow `nil`.
 Type `T?` means `T` or `nil`. You can use `==` and `!=` to test whether a value is `nil`: no implicit conversion to
 `boolean`.

```go
import ballerina/io;

// Here type `int?` indicates that the value of `v` can be an `int` or `()`.
int? v = ();

// Here the value of `n` cannot be `()`.
int? n = v == () ? 0 : v;

// Elvis operator `x ?: y` returns `x` if it is not `nil` and `y` otherwise.
int m = v ?: 0;

// Falling off the end of a function or `return` by itself is equivalent to `return ()`.
function foo() returns () {
    return ();
}

// Leaving off return type is equivalent to `returns ()`.
public function main() {

    io:println(v);
}
```

#### Output

```go
bal run nil.bal
```
# Langlib Functions

 Langlib is a small library defined by language providing fundamental operations on built-in data types.
 Langlib functions can be called using convenient method-call syntax, but these types are not objects!
 There exists a `ballerina/lang.T` module for each built-in type `T` and they are automatically imported
 using `T` prefix.

```go
import ballerina/io;

public function main() {
    // You can call langlib functions using the method-call syntax.
    string s = "abc".substring(1, 2);

    io:println(s);

    // `n` will be 1.
    int n = s.length();
    io:println(n);

    // `s.length()` is same as `string:length(s)`.
    int m = string:length(s);
    io:println(m);

}
```

#### Output

```go
bal run langlib_functions.bal
b
1
1
```
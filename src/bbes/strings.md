# Strings

 The `string` type represents immutable sequence of zero or more Unicode characters. 
 There is no separate character type: a character is represented by a `string` of length 1.
 Two `string` values are `==` if both sequences have the same characters.
 You can use `<`, `<=`, `>`, and `>=` operators on `string` values and they work by comparing code points.
 Unpaired surrogates are not allowed.

```go
import ballerina/io;

public function main() {
    // String literals use double quotes. You can use usual C escapes such as `\t \n`.
    // Numeric escapes specify Unicode code point using one or more hex digits `\u{H}`.
    string grin = "\u{1F600}";

    // String concatenation uses `+` operator.
    string greeting = "Hello" + grin;

    io:println(greeting);

    // `greeting[1]` accesses character at index 1 (zero-based).
    io:println(greeting[1]);

}
```

#### Output

```go
bal run strings.bal
Hello?
e
```
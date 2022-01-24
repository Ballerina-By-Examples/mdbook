# Match Statement

 `match` statement is similar to `switch` statement in `C` and `JavaScript`. It matches the value, not the type.
 `==` is used to test whether left hand side matches the value being matched. Left hand side can be a
 simple literal (`nil`, `boolean`, `int`, `float`, `string`) identifier referring to a constant.
 Left hand side of `_` matches if the value is of type `any`. You can use `|` to match more than one value.

```go
import ballerina/io;

const KEY = "xyzzy";

function matchTest(any v) returns string {
    // The value of the `v` variable is matched against the
    // given value match patterns.
    match v {
        17 => {
            return "number";
        }
        true => {
            return "boolean";
        }
        "str" => {
            return "string";
        }
        KEY => {
            return "constant";
        }
        0|1 => {
            return "or";
        }
        _ => {
            return "any";
        }
    }

}

public function main() {
    io:println(matchTest("str"));
    io:println(matchTest(17));
    io:println(matchTest(20.5));
}
```

#### Output

```go
bal run match_statement.bal
string
number
any
```
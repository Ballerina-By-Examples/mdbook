# Booleans and Conditionals

 The `boolean` type has two values: `true`, `false`.
 The `!` operator works on booleans only.  `&&` and `||` operators short-circuit as in C.
 Usual comparison operators (`==`, `!=`, `<`, `>`, `<=`, and `>=`) produce boolean values.

```go
import ballerina/io;

boolean flag = true;

// Here's a conditional expression. Uses C syntax.
int n = flag ? 1 : 2;

public function main() {
    // Parentheses are options in conditions, but curly braces are required in `if/else` and other compound statements. 
    if flag {
        io:println(1);
    } else {
        io:println(2);
    }

}
```

#### Output

```go
bal run booleans.bal
1
```
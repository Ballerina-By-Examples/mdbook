# Variables and Types

 A variable has a type, which constrains what values the variable can hold. 
 There is a built-in set of named types, including `int`, `float`, `boolean`, `string`.

```go
import ballerina/io;

// Modules and functions can declare variables. You can see both in this example.
// Here we declare a variable `greeting` of type `string` and initialize it to `"Hello"`.
string greeting = "Hello";

public function main() {
    // Assignments are statements not expressions.
    string name = "Ballerina";

    io:println(greeting, " ", name);
}
```

#### Output

```go
bal run variables_and_types.bal
Hello Ballerina
```
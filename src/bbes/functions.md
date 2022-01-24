# Functions

 A function accepts zero or more arguments and returns a single value.
 Function parameters are declared as in C. You are not allowed to assign to parameters in Ballerina.

```go
import ballerina/io;

// This function definition has two parameters of type `int`. 
// `returns` clause specifies type of return value.
function add(int x, int y) returns int {

    int sum = x + y;
    // `return` statement returns a value.
    return sum;

}

public function main() {
    io:println(add(5, 11));
}
```

#### Output

```go
bal run functions.bal
16
```
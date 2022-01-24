# While Statement

 The `while` statement is a more flexible iteration than `foreach`. `break` and `continue` statements
 can be used within the loops to alter control flow.

```go
import ballerina/io;

public function main() {
    LinkedList link1 = {value: "link1", next: ()};
    LinkedList link2 = {value: "link2", next: link1};
    io:println(len(link2));
}

type LinkedList record {
    string value;
    LinkedList? next;
};

function len(LinkedList ll) returns int {
    int n = 0;
    LinkedList? v = ll;
    // Executes the code block that is defined within the `while` block
    // as long as the value of `v` is not `nil`.
    while v != () {
        n += 1;
        v = v.next;
    }

    return n;
}
```

#### Output

```go
bal run while_statement.bal
2
```
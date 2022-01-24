# Transactional Qualifier

 At compile-time, regions of code are typed as being a transactional context.
 Ballerina guarantees that, whenever that region is executed, there will be a current transaction.
 A function with a `transactional` qualifier can only be called from transactional context; function  body will be a transactional context.
 `transactional` is also a boolean expression that tests at runtime whether there is a current transaction: used in a condition results in transactional context.

```go
import ballerina/io;

type Update record {
    int updateIndex;
    int stockMnt;
};

public function main() returns error? {
    Update updates = {updateIndex: 0, stockMnt: 100};
    transaction {
        check doUpdate(updates);
        check commit;
    }
    return;
}

// Called within the transaction statement.
transactional function doUpdate(Update u) returns error? {
    // Calls the `foo()` non-transactional function.
    foo(u);
    // Calls the `bar()` transactional function.
    bar(u);
    return;
}

function foo(Update u) {
    if transactional {
        // This is a transactional context.
        bar(u);

    }
}

transactional function bar(Update u) {
    io:println("Calling from a transactional context");
}
```

#### Output

```go
bal run transactional_qualifier.bal
Calling from a transactional context
Calling from a transactional context
```
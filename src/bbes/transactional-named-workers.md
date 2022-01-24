# Transactional Named Workers

 A named worker within a transactional function can be declared as transactional.
 This will start a new transaction branch for the named worker, as with a distributed transaction.

```go
import ballerina/io;

type Update record {
    int updateIndex;
    int stockMnt;
};

public function main() returns error? {
    Update newUpdate = {
        updateIndex: 132,
        stockMnt: 3500
    };
    transaction {
        check exec(newUpdate);
        check commit;
    }
    return;
}

// Transactional function can only be called from a transactional context
transactional function exec(Update u) returns error? {
    // Transactional named workers starts a transaction branch
    // in the current transaction.
    transactional worker A {
        bar();
    }
    return;
}

transactional function bar() {
    io:println("bar() invoked");
}
```

#### Output

```go
bal run transactional_named_workers.bal
bar() invoked
```
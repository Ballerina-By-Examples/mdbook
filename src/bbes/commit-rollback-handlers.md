# Commit/Rollback Handlers

 Often code needs to get executed depending on whether a transaction committed.
 Testing the result of the commit within the transaction statement works, but inconvenient from a modularity perspective, particularly when you want to undo changes on rollback.
 This seems much worse in a distributed transaction, when transaction statement is in another program.
 Ballerina provides commit/rollback handlers which are functions that get run when decision whether to commit is known.

```go
import ballerina/io;

public function main() returns error? {
    transaction {
        check update();
        check commit;
    }
    return;
}

transactional function update() returns error? {
    check updateDatabase();
    //  Registers a commit handler to be invoked when the `commit` is executed.
    'transaction:onCommit(sendEmail);
    'transaction:onRollback(logError);
    return;
}

function updateDatabase() returns error? {
    io:println("Database updated");
    return;
}

isolated function sendEmail('transaction:Info info) {
    io:println("Email sent.");
}

isolated function logError('transaction:Info info,
                            error? cause, boolean willRetry) {
    io:println("Logged database update failure");
}
```

#### Output

```go
bal run commit_rollback_handlers.bal
Database updated
Email sent.
```
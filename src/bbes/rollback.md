# Rollback

 If there is a fail or panic in the execution of the block, then the transaction is rolled back.
 Transaction statement can also contain a rollback statement.
 Every possible exit from a transaction block must be either `commit`, `rollback`, fail exit (e.g., from `check`), or panic exit.
 Rollback does not automatically restore Ballerina variables to values before the transaction.

```go
// Defines the `Update` record type.
type Update record {
    int updateIndex;
    int stockMnt;
};

public function main() returns error? {

    // Creates an array of `Update` records.
    Update[] updates =
    [{updateIndex: 0, stockMnt: 2000},
    {updateIndex: 1, stockMnt: -1000},
    {updateIndex: 2, stockMnt: 1500},
    {updateIndex: 3, stockMnt: -1000},
    {updateIndex: 4, stockMnt: -2000}];
    // If an error is returned from the `transfer` function,
    // the error is returned from the `main` and it exits.
    check transfer(updates);
    return;
}

function transfer(Update[] updates) returns error? {

    transaction {
        // Inside the transaction, call `doUpdate` on each `update` record.
        foreach var u in updates {
            // If an error is returned, the `transfer` function returns with
            // that error and the transaction is rolled back.
            check doUpdate(u);

        }
        // `commit` will not be called,because of an implicit rollback.
        check commit;

    }
    return;
}

function doUpdate(Update u) returns error? {
    // If the stock amount is less than -1500, an error is returned.
    if (u.stockMnt < -1500) {
        return error("Not enough Stocks: ", stockIndex = u.updateIndex);
    }

    return;
}
```

#### Output

```go
bal run rollback.bal
error: Not enough Stocks:  {"stockIndex":4}
```
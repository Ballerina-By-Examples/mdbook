# Atomic Batch Execute

 This BBE demonstrates how to use the JDBC client to execute a batch of
 DDL/DML operations with the help of a `transaction` to achieve the atomic behaviour.
 Note that the relevant database driver JAR should be defined in the `Ballerina.toml`
 file as a dependency. 
 This sample is based on an H2 database and the H2 database driver JAR need to be added to `Ballerina.toml` file.
 For a sample configuration and more information on the underlying module, see the [JDBC module](https:docs.central.ballerina.io/ballerinax/java.jdbc/latest/) <br><br>

```go
import ballerina/io;
import ballerinax/java.jdbc;
import ballerina/sql;

public function main() returns error? {
    // Initializes the JDBC client.
    jdbc:Client jdbcClient = check new ("jdbc:h2:file:./target/bbes/java_jdbc", 
        "rootUser", "rootPass");
    // Runs the prerequisite setup for the example.
    check beforeExample(jdbcClient);

    // Records with the duplicate `registrationID` entry. Here it is registrationID = 1.
    var insertRecords = [
        {
            firstName: "Linda",
            lastName: "Jones",
            registrationID: 2,
            creditLimit: 10000.75,
            country: "USA"
        }, 
        {
            firstName: "Peter",
            lastName: "Stuart",
            registrationID: 1,
            creditLimit: 5000.75,
            country: "USA"
        }, 
        {
            firstName: "Camellia",
            lastName: "Potter",
            registrationID: 4,
            creditLimit: 2000.25,
            country: "USA"
        }
    ];

    // Creates a batch parameterized query.
    sql:ParameterizedQuery[] insertQueries = 
        from var data in insertRecords
        select `INSERT INTO Customers
                (firstName, lastName, registrationID, creditLimit, country)
                VALUES (${data.firstName}, ${data.lastName},
                ${data.registrationID}, ${data.creditLimit}, ${data.country})`;

    // The transaction block can be used to roll back if any error occurred.
    transaction {
        var result = jdbcClient->batchExecute(insertQueries);
        if result is sql:BatchExecuteError {
            io:println(result.message());
            io:println(result.detail()?.executionResults);
            io:println("Rollback transaction.\n");
            rollback;
        } else {
            error? err = commit;
            if err is error {
                io:println("Error occurred while committing: ", err);
            }
        }
    }

    // Checks the data after the batch execution.
    stream<record {}, error?> resultStream =
        jdbcClient->query(`SELECT * FROM Customers`);

    io:println("Data in Customers table:");
    check resultStream.forEach(function(record {} result) {
        io:println(result.toString());
    });

    // Performs the cleanup after the example.
    check afterExample(jdbcClient);
}

// Initializes the database as a prerequisite to the example.
function beforeExample(jdbc:Client jdbcClient) returns sql:Error? {
    // Creates a table in the database.
    _ = check jdbcClient->execute(`CREATE TABLE Customers(customerId INTEGER
            NOT NULL IDENTITY, firstName  VARCHAR(300), lastName  VARCHAR(300),
            registrationID INTEGER UNIQUE, creditLimit DOUBLE,
            country VARCHAR(300), PRIMARY KEY (customerId))`);

    // Adds records to the newly-created table.
    _ = check jdbcClient->execute(`INSERT INTO Customers (firstName,
            lastName, registrationID,creditLimit,country) VALUES ('Peter',
            'Stuart', 1, 5000.75, 'USA')`);
}

// Cleans up the database after running the example.
function afterExample(jdbc:Client jdbcClient) returns sql:Error? {
    // Cleans the database.
    _ = check jdbcClient->execute(`DROP TABLE Customers`);
    
    // Closes the JDBC client.
    check jdbcClient.close();
}
```

#### Output

```go
# Create a Ballerina project.
# Copy the example to the project and add relevant database driver jar details to the `Ballerina.toml` file.
# Execute the command below to build and run the project.
bal run

Error while executing batch command starting with: 'INSERT INTO Customers
                (firstName, lastName, registrationID, creditLimit, country)
                VALUES ( ? ,  ? ,
                 ? ,  ? ,  ? )'.Unique index or primary key violation: "PUBLIC.CONSTRAINT_INDEX_6 ON PUBLIC.CUSTOMERS(REGISTRATIONID) VALUES 1"; SQL statement:
INSERT INTO Customers
                (firstName, lastName, registrationID, creditLimit, country)
                VALUES ( ? ,  ? ,
                 ? ,  ? ,  ? ) [23505-199].
[{"affectedRowCount":1,"lastInsertId":null},{"affectedRowCount":-3,"lastInsertId":null},{"affectedRowCount":1,"lastInsertId":null}]
Rollback transaction.

Data in Customers table:
{"CUSTOMERID":1,"FIRSTNAME":"Peter","LASTNAME":"Stuart","REGISTRATIONID":1,"CREDITLIMIT":5000.75,"COUNTRY":"USA"}
```
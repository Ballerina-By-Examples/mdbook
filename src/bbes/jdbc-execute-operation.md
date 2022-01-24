# DML and DDL Operation

 This BBE demonstrates how to use the JDBC client with DDL and
 DML operations. Note that the relevant database driver JAR
 should be defined in the `Ballerina.toml` file as a dependency.
 This sample is based on an H2 database and the H2 database driver JAR need to be added to `Ballerina.toml` file.
 For a sample configuration and more information on the underlying module, see the [JDBC module](https:docs.central.ballerina.io/ballerinax/java.jdbc/latest/) .<br><br>

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

    float newCreditLimit = 15000.5;

    // Creates a parameterized query for the record update.
    sql:ParameterizedQuery updateQuery = 
            `UPDATE Customers SET creditLimit = ${newCreditLimit} 
            where customerId = 1`;

    sql:ExecutionResult result = check jdbcClient->execute(updateQuery);
    io:println("Updated Row count: ", result?.affectedRowCount);

    string firstName = "Dan";

    // Creates a parameterized query for deleting the records.
    sql:ParameterizedQuery deleteQuery = 
            `DELETE FROM Customers WHERE firstName = ${firstName}`;

    result = check jdbcClient->execute(deleteQuery);
    io:println("Deleted Row count: ", result.affectedRowCount);

    // Performs the cleanup after the example.
    check afterExample(jdbcClient);
}

// Initializes the database as a prerequisite to the example.
function beforeExample(jdbc:Client jdbcClient) returns sql:Error? {
    //Creates a table in the database.
    sql:ExecutionResult result = 
        check jdbcClient->execute(`CREATE TABLE Customers(customerId INTEGER
            NOT NULL IDENTITY, firstName  VARCHAR(300), lastName  VARCHAR(300),
            registrationID INTEGER, creditLimit DOUBLE, country  VARCHAR(300),
            PRIMARY KEY (customerId))`);

    // Inserts data into the table. The result will have the `affectedRowCount`
    // and `lastInsertedId` with the auto-generated ID of the last row.
    result = check jdbcClient->execute(`INSERT INTO Customers (firstName,
            lastName, registrationID,creditLimit,country) VALUES ('Peter',
            'Stuart', 1, 5000.75, 'USA')`);
    result = check jdbcClient->execute(`INSERT INTO Customers (firstName,
            lastName, registrationID,creditLimit,country) VALUES
            ('Dan', 'Brown', 2, 10000, 'UK')`);

    io:println("Rows affected: ", result.affectedRowCount);
    io:println("Generated Customer ID: ", result.lastInsertId);
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

Rows affected: 1
Generated Customer ID: 2
Updated Row count: 1
Deleted Row count: 1
```
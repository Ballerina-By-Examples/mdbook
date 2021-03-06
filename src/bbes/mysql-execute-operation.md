# DML and DDL Operation

 This BBE demonstrates how to use the MySQL client with the DDL and  DML
 operations. Note that the MySQL database driver JAR should be defined in the `Ballerina.toml` file as a dependency.
 For a sample configuration and more information on the underlying module, see the [MySQL module](https:docs.central.ballerina.io/ballerinax/mysql/latest/).
 The MySQL connector uses database properties from MySQL version 8.0.13 onwards. Therefore, it is
 recommended to use a MySQL driver version greater than 8.0.13.<br><br>

```go
import ballerina/io;
import ballerinax/mysql;
import ballerina/sql;

public function main() returns error? {
    // Runs the prerequisite setup for the example.
    check beforeExample();

    // Initializes the MySQL client.
    mysql:Client mysqlClient = check new (user = "root", 
            password = "Test@123", database = "MYSQL_BBE");

    float newCreditLimit = 15000.5;

    // Creates a parameterized query for the record update.
    sql:ParameterizedQuery updateQuery = 
            `UPDATE Customers SET creditLimit = ${newCreditLimit} 
            where customerId = 1`;

    sql:ExecutionResult result = check mysqlClient->execute(updateQuery);
    io:println("Updated Row count: ", result?.affectedRowCount);

    string firstName = "Dan";

    // Creates a parameterized query for deleting the records.
    sql:ParameterizedQuery deleteQuery = 
            `DELETE FROM Customers WHERE firstName = ${firstName}`;

    result = check mysqlClient->execute(deleteQuery);
    io:println("Deleted Row count: ", result.affectedRowCount);

    // Performs the cleanup after the example.
    check afterExample(mysqlClient);
}

// Initializes the database as a prerequisite to the example.
function beforeExample() returns sql:Error? {
    mysql:Client mysqlClient = check new (user = "root", password = "Test@123");

    // Creates a database.
    sql:ExecutionResult result = 
        check mysqlClient->execute(`CREATE DATABASE MYSQL_BBE`);

    //Creates a table in the database.
    result = check mysqlClient->execute(`CREATE TABLE MYSQL_BBE.Customers
            (customerId INTEGER NOT NULL AUTO_INCREMENT, firstName  
            VARCHAR(300), lastName  VARCHAR(300), registrationID INTEGER, 
            creditLimit DOUBLE, country VARCHAR(300),
            PRIMARY KEY (customerId))`);

    // Inserts data into the table. The result will have the `affectedRowCount`
    // and `lastInsertedId` with the auto-generated ID of the last row.
    result = check mysqlClient->execute(`INSERT INTO MYSQL_BBE.Customers
            (firstName, lastName, registrationID,creditLimit,country) VALUES
            ('Peter','Stuart', 1, 5000.75, 'USA')`);
    result = check mysqlClient->execute(`INSERT INTO MYSQL_BBE.Customers
            (firstName, lastName, registrationID,creditLimit,country) VALUES
            ('Dan', 'Brown', 2, 10000, 'UK')`);

    io:println("Rows affected: ", result.affectedRowCount);
    io:println("Generated Customer ID: ", result.lastInsertId);

    check mysqlClient.close();
}

// Cleans up the database after running the example.
function afterExample(mysql:Client mysqlClient) returns sql:Error? {
    // Cleans the database.
    _ = check mysqlClient->execute(`DROP DATABASE MYSQL_BBE`);
    
    // Closes the MySQL client.
    check mysqlClient.close();
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
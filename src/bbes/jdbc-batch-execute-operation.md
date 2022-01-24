# Batch Execute

 This BBE demonstrates how to use the JDBC client to execute a batch of
 DDL/DML operations. Note that the relevant database driver JAR
 should be defined in the `Ballerina.toml` file as a dependency. 
 This sample is based on an H2 database and the H2 database driver JAR need to be added to the `Ballerina.toml` file.
 For a sample configuration and more information on the underlying module, see the [JDBC module](https:docs.central.ballerina.io/ballerinax/java.jdbc/latest/).<br><br>

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

    // The records to be inserted.
    var insertRecords = [
        {
            firstName: "Peter",
            lastName: "Stuart",
            registrationID: 1,
            creditLimit: 5000.75,
            country: "USA"
        }, 
        {
            firstName: "Stephanie",
            lastName: "Mike",
            registrationID: 2,
            creditLimit: 8000.00,
            country: "USA"
        }, 
        {
            firstName: "Bill",
            lastName: "John",
            registrationID: 3,
            creditLimit: 3000.25,
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

    // Inserts the records with the auto-generated ID.
    sql:ExecutionResult[] result = 
                            check jdbcClient->batchExecute(insertQueries);

    int[] generatedIds = [];
    foreach var summary in result {
        generatedIds.push(<int>summary.lastInsertId);
    }
    io:println("\nInsert success, generated IDs are: ", generatedIds, "\n");

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
            registrationID INTEGER, creditLimit DOUBLE, country  VARCHAR(300),
            PRIMARY KEY (customerId))`);
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

Insert success, generated IDs are: [1,2,3]

Data in Customers table:
{"CUSTOMERID":1,"FIRSTNAME":"Peter","LASTNAME":"Stuart","REGISTRATIONID":1,"CREDITLIMIT":5000.75,"COUNTRY":"USA"}
{"CUSTOMERID":2,"FIRSTNAME":"Stephanie","LASTNAME":"Mike","REGISTRATIONID":2,"CREDITLIMIT":8000.0,"COUNTRY":"USA"}
{"CUSTOMERID":3,"FIRSTNAME":"Bill","LASTNAME":"John","REGISTRATIONID":3,"CREDITLIMIT":3000.25,"COUNTRY":"USA"}
```
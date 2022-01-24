# Simple Query

 This BBE demonstrates how to use the JDBC client select query operations
 with the stream return type. Note that the relevant database driver JAR
 should be defined in the `Ballerina.toml` file as a dependency.
 This sample is based on an H2 database and the H2 database driver JAR need to be added to `Ballerina.toml` file.
 For a sample configuration and more information on the underlying module, see the [JDBC module](https:docs.central.ballerina.io/ballerinax/java.jdbc/latest/) .<br><br>

```go
import ballerina/io;
import ballerinax/java.jdbc;
import ballerina/sql;

// Defines a record to load the query result schema as shown below in the
// 'getDataWithTypedQuery' function. In this example, all columns of the 
// customer table will be loaded. Therefore, the `Customer` record will be 
// created with all the columns. The column name of the result and the 
// defined field name of the record will be matched case insensitively.
type Customer record {|
    int customerId;
    string lastName;
    string firstName;
    int registrationId;
    float creditLimit;
    string country;
|};

public function main() returns error? {
    // Initializes the JDBC client.
    jdbc:Client jdbcClient = check new ("jdbc:h2:file:./target/bbes/java_jdbc", 
        "rootUser", "rootPass");
    // Runs the prerequisite setup for the example.
    check beforeExample(jdbcClient);

    // Selects the rows in the database table via the query remote operation.
    // The result is returned as a stream and the elements of the stream can
    // be either a record or an error. The name and type of the attributes 
    // within the record from the `resultStream` will be automatically 
    // identified based on the column name and type of the query result.
    stream<record {}, error?> resultStream =
            jdbcClient->query(`SELECT * FROM Customers`);

    // If there is any error during the execution of the SQL query or
    // iteration of the result stream, the result stream will terminate and
    // return the error.
    check resultStream.forEach(function(record {} result) {
        io:println("Full Customer details: ", result);
    });

    // The result of the count operation is provided as a record stream.
    stream<record {}, error?> resultStream2 =
            jdbcClient->query(`SELECT COUNT(*) AS total FROM Customers`);

    // Since the above count query will return only a single row,
    // the `next()` operation is sufficient to retrieve the data.
    record {|record {} value;|}|error? result = resultStream2.next();
    // Checks the result and retrieves the value for the total.
    if result is record {|record {} value;|} {
        io:println("Total rows in customer table : ", result.value["TOTAL"]);
    }

    // In general cases, the stream will be closed automatically
    // when the stream is fully consumed or any error is encountered.
    // However, in case if the stream is not fully consumed, the stream
    // should be closed specifically.
    check resultStream2.close();

    // If a `Customer` stream type is defined when calling the query method,
    // The result is returned as a `Customer` record stream and the elements
    // of the stream can be either a `Customer` record or an error.
    stream<Customer, error?> customerStream =
        jdbcClient->query(`SELECT * FROM Customers`);

    // Iterates the customer stream.
    check customerStream.forEach(function(Customer customer) {
        io:println("Full Customer details: ", customer);
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

    // Adds records to the newly-created table.
    _ = check jdbcClient->execute(`INSERT INTO Customers (firstName,
            lastName, registrationID,creditLimit,country) VALUES ('Peter',
            'Stuart', 1, 5000.75, 'USA')`);
    _ = check jdbcClient->execute(`INSERT INTO Customers (firstName,
            lastName, registrationID,creditLimit,country) VALUES
            ('Dan', 'Brown', 2, 10000, 'UK')`);
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

Full Customer details: {"CUSTOMERID":1,"FIRSTNAME":"Peter","LASTNAME":"Stuart","REGISTRATIONID":1,"CREDITLIMIT":5000.75,"COUNTRY":"USA"}
Full Customer details: {"CUSTOMERID":2,"FIRSTNAME":"Dan","LASTNAME":"Brown","REGISTRATIONID":2,"CREDITLIMIT":10000.0,"COUNTRY":"UK"}
Total rows in customer table : 2
Full Customer details: {"customerId":1,"firstName":"Peter","lastName":"Stuart","registrationId":1,"creditLimit":5000.75,"country":"USA"}
Full Customer details: {"customerId":2,"firstName":"Dan","lastName":"Brown","registrationId":2,"creditLimit":10000.0,"country":"UK"}
```
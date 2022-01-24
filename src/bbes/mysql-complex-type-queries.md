# Query With Complex Types

 This BBE demonstrates how to use the MySQL client with complex data types
 such as JSON, binary, blobs, and date/time fields. Note that the MySQL database
 driver JAR should be defined in the `Ballerina.toml` file as a dependency.
 For a sample configuration and more information on the underlying module, see the [MySQL module](https:docs.central.ballerina.io/ballerinax/mysql/latest/).
 The MySQL connector uses database properties from MySQL version 8.0.13 onwards. Therefore, it is
 recommended to use a MySQL driver version greater than 8.0.13.<br><br>

```go
import ballerina/io;
import ballerinax/mysql;
import ballerina/sql;
import ballerina/time;

// The `BinaryType` record to represent the `BINARY_TYPES` database table.
type BinaryType record {|
    int row_id;
    byte[] blob_type;
    byte[] binary_type;
|};

// The `JsonType` record to represent the `JSON_TYPES` database table.
type JsonType record {|
    int row_id;
    json json_doc;
    json json_array;
|};

// The `DateTimeType` record to represent the `DATE_TIME_TYPES` database table.
type DateTimeType record {|
    int row_id;
    string date_type;
    int time_type;
    time:Utc timestamp_type;
    string datetime_type;
|};

public function main() returns error? {
    // Runs the prerequisite setup for the example.
    check beforeExample();

    // Initializes the MySQL client.
    mysql:Client mysqlClient = check new (user = "root", 
            password = "Test@123", database = "MYSQL_BBE");

    // Since the `rowType` is provided as a `BinaryType`, the `binaryResultStream`
    // will have `BinaryType` records.
    stream<BinaryType, error?> binaryResultStream =
                mysqlClient->query(`SELECT * FROM BINARY_TYPES`);

    io:println("Binary types Result :");
    // Iterates the `binaryResultStream`.
    check binaryResultStream.forEach(function(BinaryType result) {
        io:println(result);
    });

    // Since the `rowType` is provided as an `JsonType`, the `jsonResultStream` will
    // have `JsonType` records.
    stream<JsonType, error?> jsonResultStream =
                mysqlClient->query(`SELECT * FROM JSON_TYPES`);

    io:println("Json type Result :");
    // Iterates the `jsonResultStream`.
    check jsonResultStream.forEach(function(JsonType result) {
        io:println(result);
    });

    // Since the `rowType` is provided as a `DateTimeType`, the `dateResultStream`
    // will have `DateTimeType` records. The `Date`, `Time`, `DateTime`, and
    // `Timestamp` fields of the database table can be mapped to `time:Utc`,
    // string, and int types in Ballerina.
    stream<DateTimeType, error?> dateResultStream =
                mysqlClient->query(`SELECT * FROM DATE_TIME_TYPES`);

    io:println("DateTime types Result :");
    // Iterates the `dateResultStream`.
    check dateResultStream.forEach(function(DateTimeType result) {
        io:println(result);
    });

    // Performs the cleanup after the example.
    check afterExample(mysqlClient);
}

// Initializes the database as a prerequisite to the example.
function beforeExample() returns sql:Error? {
    mysql:Client mysqlClient = check new (user = "root", password = "Test@123");

    // Creates a database.
    _ = check mysqlClient->execute(`CREATE DATABASE MYSQL_BBE`);
    
    // Create complex data type tables in the database.
    _ = check mysqlClient->execute(`CREATE TABLE MYSQL_BBE.BINARY_TYPES
            (row_id INTEGER NOT NULL, blob_type BLOB(1024),  
            binary_type BINARY(27), PRIMARY KEY (row_id))`);
    _ = check mysqlClient->execute(`CREATE TABLE MYSQL_BBE.JSON_TYPES
            (row_id INTEGER NOT NULL, json_doc JSON, json_array JSON,
            PRIMARY KEY (row_id))`);
    _ = check mysqlClient->execute(
            `CREATE TABLE MYSQL_BBE.DATE_TIME_TYPES (row_id
            INTEGER NOT NULL, date_type DATE, time_type TIME, 
            timestamp_type timestamp, datetime_type  datetime, 
            PRIMARY KEY (row_id))`);

    // Adds the records to the newly-created tables.
    _ = check mysqlClient->execute(`INSERT INTO MYSQL_BBE.BINARY_TYPES
            (row_id, blob_type, binary_type) VALUES (1,
            X'77736F322062616C6C6572696E6120626C6F6220746573742E',  
            X'77736F322062616C6C6572696E612062696E61727920746573742E')`);
    _ = check mysqlClient->execute(`INSERT INTO MYSQL_BBE.JSON_TYPES
            (row_id, json_doc, json_array) VALUES (1, '{"firstName" : "Jhon",
            "lastName" : "Bob", "age" : 18}', JSON_ARRAY(1, 2, 3))`);
    _ = check mysqlClient->execute(
            `Insert into MYSQL_BBE.DATE_TIME_TYPES (row_id,
            date_type, time_type, timestamp_type, datetime_type) values (1, 
            '2017-05-23', '14:15:23', '2017-01-25 16:33:55', 
            '2017-01-25 16:33:55')`);

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

Binary types Result :
{"row_id":1,"blob_type":[119,115,111,50,32,98,97,108,108,101,114,105,110,97,32,98,108,111,98,32,116,101,115,116,46],"binary_type":[119,115,111,50,32,98,97,108,108,101,114,105,110,97,32,98,105,110,97,114,121,32,116,101,115,116,46]}
Json type Result :
{"row_id":1,"json_doc":{"age":18,"lastName":"Bob","firstName":"Jhon"},"json_array":[1,2,3]}
DateTime types Result :
{"row_id":1,"date_type":"2017-05-23","time_type":11723000,"timestamp_type":[1485342235,0],"datetime_type":"2017-01-25 11:03:55.0"}
```
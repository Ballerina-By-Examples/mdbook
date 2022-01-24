# Query With Complex Types

 This BBE demonstrates how to use the JDBC client with complex data types
 such as arrays, binary, blobs, clob, and date/time fields. Note that the
 relevant database driver JAR should be defined in the `Ballerina.toml` file as a dependency.
 This sample is based on an H2 database and the H2 database driver JAR need to be added to `Ballerina.toml` file.
 For a sample configuration and more information on the underlying module, see the [JDBC module](https:docs.central.ballerina.io/ballerinax/java.jdbc/latest/).<br><br>

```go
import ballerina/io;
import ballerinax/java.jdbc;
import ballerina/sql;
import ballerina/time;

// The `BinaryType` record to represent the `BINARY_TYPES` database table.
type BinaryType record {|
    int row_id;
    byte[] blob_type;
    string clob_type;
    byte[] binary_type;
|};

// The `ArrayType` record to represent the `ARRAY_TYPES` database table.
type ArrayType record {|
    int row_id;
    int[] int_array;
    int[] long_array;
    decimal[] float_array;
    float[] double_array;
    boolean[] boolean_array;
    string[] string_array;
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
    // Initializes the JDBC client.
    jdbc:Client jdbcClient = check new ("jdbc:h2:file:./target/bbes/java_jdbc",
        "rootUser", "rootPass");
    // Runs the prerequisite setup for the example.
    check beforeExample(jdbcClient);

    // Since the `rowType` is provided as a `BinaryType`, the `binaryResultStream`
    // will have `BinaryType` records.
    stream<BinaryType, error?> binaryResultStream =
                jdbcClient->query(`SELECT * FROM BINARY_TYPES`);

    io:println("Binary types Result :");
    // Iterates the `binaryResultStream`.
    check binaryResultStream.forEach(function(BinaryType result) {
        io:println(result);
    });

    // Since the `rowType` is provided as an `ArrayType`, the `arrayResultStream` will
    // have `ArrayType` records.
    stream<ArrayType, error?> arrayResultStream =
                jdbcClient->query(`SELECT * FROM ARRAY_TYPES`);

    io:println("Array types Result :");
    // Iterates the `arrayResultStream`.
    check arrayResultStream.forEach(function(ArrayType result) {
        io:println(result);
    });

    // Since the `rowType` is provided as a `DateTimeType`, the `dateResultStream`
    // will have `DateTimeType` records. The `Date`, `Time`, `DateTime`, and
    // `Timestamp` fields of the database table can be mapped to `time:Utc`,
    // string, and int types in Ballerina.
    stream<DateTimeType, error?> dateResultStream =
                jdbcClient->query(`SELECT * FROM DATE_TIME_TYPES`);

    io:println("DateTime types Result :");
    // Iterates the `dateResultStream`.
    check dateResultStream.forEach(function(DateTimeType result) {
        io:println(result);
    });

    // Performs the cleanup after the example.
    check afterExample(jdbcClient);
}

// Initializes the database as a prerequisite to the example.
function beforeExample(jdbc:Client jdbcClient) returns sql:Error? {
    // Creates complex data type tables in the database.
    _ = check jdbcClient->execute(`CREATE TABLE BINARY_TYPES (row_id
            INTEGER NOT NULL, blob_type BLOB(1024), clob_type CLOB(1024), 
            binary_type BINARY(27), PRIMARY KEY (row_id))`);
    _ = check jdbcClient->execute(`CREATE TABLE ARRAY_TYPES (row_id
            INTEGER NOT NULL, int_array ARRAY, long_array ARRAY, 
            float_array ARRAY, double_array ARRAY, boolean_array ARRAY, 
            string_array ARRAY, PRIMARY KEY (row_id))`);
    _ = check jdbcClient->execute(`CREATE TABLE DATE_TIME_TYPES(row_id
            INTEGER NOT NULL, date_type DATE, time_type TIME, 
            timestamp_type timestamp, datetime_type  datetime, 
            PRIMARY KEY (row_id))`);

    // Adds the records to the newly-created tables.
    _ = check jdbcClient->execute(`INSERT INTO BINARY_TYPES (row_id,
            blob_type, clob_type, binary_type) VALUES (1, 
            X'77736F322062616C6C6572696E6120626C6F6220746573742E', 
            CONVERT('very long text', CLOB), 
            X'77736F322062616C6C6572696E612062696E61727920746573742E')`);
    _ = check jdbcClient->execute(`INSERT INTO ARRAY_TYPES (row_id,
            int_array, long_array, float_array, double_array, boolean_array, 
            string_array) VALUES (1, (1, 2, 3), (100000000, 200000000, 
            300000000), (245.23, 5559.49, 8796.123), (245.23, 5559.49, 
            8796.123), (TRUE, FALSE, TRUE), ('Hello', 'Ballerina'))`);
    _ = check jdbcClient->execute(`Insert into DATE_TIME_TYPES (row_id,
            date_type, time_type, timestamp_type, datetime_type) values (1, 
            '2017-05-23', '14:15:23', '2017-01-25 16:33:55', 
            '2017-01-25 16:33:55')`);
}

// Cleans up the database after running the example.
function afterExample(jdbc:Client jdbcClient) returns sql:Error? {
    // Cleans the database.
    _ = check jdbcClient->execute(`DROP TABLE BINARY_TYPES`);
    _ = check jdbcClient->execute(`DROP TABLE ARRAY_TYPES`);
    _ = check jdbcClient->execute(`DROP TABLE DATE_TIME_TYPES`);
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

Binary types Result :
{"row_id":1,"blob_type":[119,115,111,50,32,98,97,108,108,101,114,105,110,97,32,98,108,111,98,32,116,101,115,116,46],"clob_type":"very long text","binary_type":[119,115,111,50,32,98,97,108,108,101,114,105,110,97,32,98,105,110,97,114,121,32,116,101,115,116,46]}
Array types Result :
{"row_id":1,"int_array":[1,2,3],"long_array":[100000000,200000000,300000000],"float_array":[245.23,5559.49,8796.123],"double_array":[245.23,5559.49,8796.123],"boolean_array":[true,false,true],"string_array":["Hello","Ballerina"]}
DateTime types Result :
{"row_id":1,"date_type":"2017-05-23","time_type":31523000,"timestamp_type":1485342235 0,"datetime_type":"2017-01-25 16:33:55.0"}
```
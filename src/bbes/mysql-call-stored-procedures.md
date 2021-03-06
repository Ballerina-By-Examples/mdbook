# Call Stored Procedures

 This BBE demonstrates how to use the MySQL client to execute a stored
 procedure. Note that the MySQL database driver JAR should be defined in
 the `Ballerina.toml` file as a dependency.
 For a sample configuration and more information on the underlying module, see the [MySQL module](https:docs.central.ballerina.io/ballerinax/mysql/latest/).
 The MySQL connector uses database properties from MySQL version 8.0.13 onwards. Therefore, it is
 recommended to use a MySQL driver version greater than 8.0.13.<br><br>

```go
import ballerina/io;
import ballerinax/mysql;
import ballerina/sql;

// The `Student` record to represent the database table.
type Student record {
    int id;
    int age;
    string name;
};

public function main() returns error? {
    // Runs the prerequisite setup for the example.
    check beforeExample();

    // Initializes the MySQL client.
    mysql:Client mysqlClient = check new (user = "root", 
            password = "Test@123", database = "MYSQL_BBE");

    // Creates a parameterized query to invoke the procedure.
    string name = "George";
    int age = 24;
    sql:ParameterizedCallQuery sqlQuery = 
                                `CALL InsertStudent(${name}, ${age})`;

    // Invokes the stored procedure `InsertStudent` with the `IN` parameters.
    sql:ProcedureCallResult retCall = check mysqlClient->call(sqlQuery);
    io:println("Call stored procedure `InsertStudent`." + 
        "\nAffected Row count: ", retCall.executionResult?.affectedRowCount);
    check retCall.close();

    // Initializes the `INOUT` and `OUT` parameters.
    sql:InOutParameter id = new (1);
    sql:IntegerOutParameter totalCount = new;
    sql:ParameterizedCallQuery sqlQuery2 = 
                        `{CALL GetCount(${id}, ${totalCount})}`;

    // The stored procedure with the `OUT` and `INOUT` parameters is invoked.
    sql:ProcedureCallResult retCall2 = check mysqlClient->call(sqlQuery2);
    io:println("Call stored procedure `GetCount`.");
    io:println("Age of the student with id '1' : ", id.get(int));
    io:println("Total student count: ", totalCount.get(int));
    check retCall2.close();

    // Invokes the stored procedure, which returns the data.
    sql:ProcedureCallResult retCall3 = 
            check mysqlClient->call(`{CALL GetStudents()}`, [Student]);
    io:println("Call stored procedure `GetStudents`.");

    // Processes the returned result stream.
    stream<record {}, sql:Error?>? result = retCall3.queryResult;
    if result is stream<record {}, sql:Error?> {
        stream<Student, sql:Error?> studentStream =
                <stream<Student, sql:Error?>>result;
        check studentStream.forEach(function(Student student) {
            io:println("Student details: ", student);
        });
    }
    check retCall3.close();

    // Performs the cleanup after the example.
    check afterExample(mysqlClient);
}

// Initializes the database as a prerequisite to the example.
function beforeExample() returns sql:Error? {
    mysql:Client mysqlClient = check new (user = "root", password = "Test@123");

    // Creates a database.
    _ = check mysqlClient->execute(`CREATE DATABASE MYSQL_BBE`);

    // Creates a table in the database.
    _ = check mysqlClient->execute(`CREATE TABLE MYSQL_BBE.Student
            (id INT AUTO_INCREMENT, age INT, name VARCHAR(255),
            PRIMARY KEY (id))`);

    // Creates the necessary stored procedures using the execute command.
    _ = check mysqlClient->execute(`CREATE PROCEDURE
        MYSQL_BBE.InsertStudent (IN pName VARCHAR(255), IN pAge INT)
        BEGIN INSERT INTO Student(age, name) VALUES (pAge, pName); END`);
    _ = check mysqlClient->execute(`CREATE PROCEDURE MYSQL_BBE.GetCount
        (INOUT pID INT, OUT totalCount INT) BEGIN SELECT age INTO pID FROM
        Student WHERE id = pID; SELECT COUNT(*) INTO totalCount FROM Student;
        END`);
    _ = check mysqlClient->execute(`CREATE PROCEDURE
        MYSQL_BBE.GetStudents() BEGIN SELECT * FROM Student; END`);

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

Call stored procedure `InsertStudent`.
Affected Row count: 1
Call stored procedure `GetCount`.
Age of the student with id '1' : 24
Total student count: 1
Call stored procedure `GetStudents`.
Student details: {"id":1,"age":24,"name":"George"}
```
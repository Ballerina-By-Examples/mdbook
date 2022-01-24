# Multiple Key Fields

 A `table` provides access to its members using a key that comes from the `read-only` fields of the member.
 It is a key sequence, which is used to provide keyed access to its members. The key sequence is an ordered
 sequence of field names.

```go
import ballerina/io;

type Employee record {
    readonly string firstName;
    readonly string lastName;
    int salary;
};

public function main() {
    // `t` has a key sequence with `firstName` and `lastName` fields.
    table<Employee> key(firstName, lastName) t = table [
        {firstName: "John", lastName: "Smith", salary: 100},
        {firstName: "Fred", lastName: "Bloggs", salary: 200}
    ];

    // The key sequence provides keyed access to members of the `table`.
    Employee? e = t["Fred", "Bloggs"];


    io:println(e);
}
```

#### Output

```go
bal run multiple_key_fields.bal
{"firstName":"Fred","lastName":"Bloggs","salary":200}
```
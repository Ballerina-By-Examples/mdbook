# Structured Keys

 Key fields can be structured where they belong to any subtype of plain data. The Value of key field
 must be immutable. Initializer of `readonly` field will be constructed as immutable. In other cases,
 can use `cloneReadOnly` to create an immutable value.

```go
import ballerina/io;

type Employee record {
    readonly record {
        string first;
        string last;
    } name;
    int salary;
};

public function main() {
    // key field, `name` is of `record` type.
    table<Employee> key(name) t = table [
        {name: {first: "John", last: "Smith"}, salary: 100},
        {name: {first: "Fred", last: "Bloggs"}, salary: 200}
    ];

    Employee? e = t[{first: "Fred", last: "Bloggs"}];
    io:println(e);
}
```

#### Output

```go
bal run structured_keys.bal
{"name":{"first":"Fred","last":"Bloggs"},"salary":200}
```
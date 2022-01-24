# Table Syntax

 A `table` is a collection of records. Each `record` represents a row of the `table`.
 A `table` is plain data if and only if its rows are plain data. A `table` maintains an invariant
 that each row is uniquely identified by a key. Each row’s key is stored in fields, which
 must be immutable. <br/><br/>
 Compared to maps,
 <ul>
 <li>key is part of the value rather than being separate.</li>
 <li>The type of the key is not restricted to `string`.</li>
 <li>The order of the members is preserved.</li>
 </ul>
 <br/><br/>
 <p>A `record` field can be declared as `readonly`. A value cannot be assigned to such a field
 after the record is created. The `table` type gives the type of the row and the name of the key field.
 The `table constructor expression` looks like an `array constructor`. The `foreach` statement will
 iterate over a table's rows in their order. Use `t[k]` to access a row using its key.</p>

```go
import ballerina/io;

type Employee record {
    readonly string name;
    int salary;
};

// Creates a `table` with `Employee` type members, where each
// member is uniquely identified using their `name` field.
table<Employee> key(name) t = table [
    { name: "John", salary: 100 },
    { name: "Jane", salary: 200 }
];

function increaseSalary(int n) {
    // Iterates over the rows of `t` in the specified order.
    foreach Employee e in t {
        e.salary += n;
    }

}

public function main() {
    // Retrieves `Employee` with key value `Fred`.
    Employee? e = t["Fred"];
    io:println(e.toBalString());

    increaseSalary(100);
    io:println(t);
}
```

#### Output

```go
bal run table_syntax.bal
()
[{"name":"John","salary":200},{"name":"Jane","salary":300}]
```
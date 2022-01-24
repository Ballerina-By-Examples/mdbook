# Open Records

 Record types are by default open: they allow fields other than those specified. The type of unspecified
 fields are `anydata`. Records are `maps`. Open records belongs to `map<anydata>`. Use quoted keys for
 fields not mentioned in the `record` type.

```go
import ballerina/io;

// `Person` type allows additional fields with `anydata` values.
type Person record {
    string name;
};

// `Employee` type allows additional fields with `anydata` values.
type Employee record {
    string name;
    int id;
};

// Adds an additional `id` field to `e`.
Employee e = {
    name: "James", id: 10
};

// You can assign an `Employee` type value to a `Person`.
Person p = e;

Person p2 = {
    name: "John", "country": "UK"
};

// You can assign a `Person` type value to a `map`.
map<anydata> m = p2;

public function main() {
    io:println(p);
    io:println(m);
}
```

#### Output

```go
bal run open_records.bal
{"name":"James","id":10}
{"name":"John","country":"UK"}
```
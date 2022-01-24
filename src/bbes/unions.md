# Unions

 `T1|T2` is the union of the sets described by `T1` and `T2`. `T?` is completely equivalent to `T|()`.
 Unions are untagged. The `is` operator tests whether a value belongs to a specific type. `is` operator in
 the condition causes declared type to be narrowed.

```go
import ballerina/io;

type StructuredName record {
    string firstName;
    string lastName;
};

// A `Name` type value can be either a `StructuredName` or a `string`.
type Name StructuredName|string;

public function main() {
    // `name1` is a `StructuredName`.
    Name name1 = {
        firstName: "Rowan",
        lastName: "Atkinson"
    };
    // `name2` is a `string`.
    Name name2 = "Leslie Banks";

    io:println(nameToString(name1));
    io:println(nameToString(name2));
}

function nameToString(Name nm) returns string {
    // Checks whether `nm` belongs to `string` type.
    if nm is string {

        return nm;
    } else {
        return nm.firstName + " " + nm.lastName;
    }
}
```

#### Output

```go
bal run unions.bal
Rowan Atkinson
Leslie Banks
```
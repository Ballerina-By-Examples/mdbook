# Optional Fields

 Fields of a record can be marked as optional. These fields can be omitted when creating a record.
 Such fields can be accessed via optional field access (e.g., `p?.name`) or member access (e.g., `p["name"]`)
 which will both return `()` if the field is not present in the record.

```go
import ballerina/io;

type Headers record {
   string 'from;
   string to;

   // Records can have optional fields
   string subject?;

};

Headers h = {
  'from: "John",
  to: "Jill"
};

//Use ?. operator to access optional field
string? subject = h?.subject;

public function main() {
    io:println("Header value: ", h);
    io:println("Subject value:", subject);
}
```

#### Output

```go
bal run optional_fields.bal
Header value: {"from":"John","to":"Jill"}
Subject value:
```
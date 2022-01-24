# Destructuring Records

 Destructuring records is particularly useful with `query expressions`, but works anywhere you can have `var`.
 `var` is followed by a `binding pattern`. The semantics of `binding pattern` is open. `{x}` is short for
 `{x: x}` in both binding patterns and record constructors.

```go
import ballerina/io;

type Person record {
 string first;
 string last;
 int yearOfBirth;
};

public function main() {
    Person[] persons = [
        {first: "Melina", last: "Kodel", yearOfBirth: 1994},
        {first: "Tom", last: "Riddle", yearOfBirth: 1926}
    ];

    // A `Person` record is destructured here, as a
    // projection with `first` and `last` fields.
    // `{first: f, last: l}` is the `binding pattern`.
    var names1 = from var {first: f, last: l} in persons
                select {first: f, last: l};


    io:println(names1);

    // The same can be simplified as this.
    var names2 = from var {first, last} in persons
                select {first, last};


    io:println(names2);
}
```

#### Output

```go
bal run destructuring_records.bal
[{"first":"Melina","last":"Kodel"},{"first":"Tom","last":"Riddle"}]
[{"first":"Melina","last":"Kodel"},{"first":"Tom","last":"Riddle"}]
```
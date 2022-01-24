# JSON Type

 `json` type is a union: `()|boolean|int|float|decimal|string|json[]|map<json>`. A `json` value can
 be converted to and from the JSON format straightforwardly except for the choice of the Ballerina numeric type.
 Ballerina syntax is compatible with `JSON` and allows `null` for `()` for JSON compatibility.
 `json` is `anydata` without `table` and `xml`. `toJson` recursively converts `anydata` to `json`.
 `table` values are converted to `arrays`. `xml` values are converted to `strings`.`json` and `xml`
 types are not parallel.

```go
import ballerina/io;
import ballerina/lang.value;

json j = { "x": 1, "y": 2 };

// Returns the `string` that represents `j` in JSON format.
string s = j.toJsonString();

// Parses a `string` in the JSON format and returns the value that it represents.
json j2 = check value:fromJsonString(s);

// Allows `null` for JSON compatibility.
json j3 = null;

public function main() {
    io:println(s);
    io:println(j2);
}
```

#### Output

```go
bal run json_type.bal
{"x":1, "y":2}
{"x":1,"y":2}
```
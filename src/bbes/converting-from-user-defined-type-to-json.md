# Converting From User-Defined Type to JSON

 Conversion from `json` value to JSON format is straightforward.
 Converting from application-specific, user-defined subtype of `anydata`
 to `json` is also possible.
 In many cases, this is a no-op: user-defined type will be a subtype of
 `json` as well as of `anydata`.
 With tables, XML or records open to `anydata`, use `toJson` to convert
 `anydata` to `json`.
 APIs that generate JSON typically accept `anydata` and automatically 
 apply `toJson`.

```go
import ballerina/io;

// Closed type.
type ClosedCoord record {|
    float x;
    float y;
|};

// Open type, can have additional `anydata` fields.
type OpenCoord record {
    float x;
    float y;
};

public function main() {
    ClosedCoord a = {x: 1.0, y: 2.0};
    // Nothing to do.
    json j = a;

    io:println(j);

    OpenCoord b = {x: 1.0, y: 2.0, "z": "city"};
    // Use `toJson` to convert `anydata` to `json`.
    // Usually happens automatically.
    json k = b.toJson();

    io:println(k);
}
```

#### Output

```go
bal run converting_from_user_defined_type_to_json.bal
{"x":1.0,"y":2.0}
{"x":1.0,"y":2.0,"z":"city"}
```
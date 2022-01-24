# JSON Numbers

 Ballerina has three numeric types; but JSON has one.
 The `json` type allows `int|float|decimal`.
 `toJsonString` will convert `int|float|decimal` into JSON numeric syntax.
 `fromJsonString` converts JSON numeric syntax into `int`, if possible, and
 otherwise `decimal`.
 `cloneWithType` or `ensureType` will convert from `int` or `decimal` into user's
 chosen numeric type.
 Net result is that you can use `json` to exchange full range of all three Ballerina
 numeric types.
 `-0` is an edge case: represented as `float`.

```go
import ballerina/io;

public function main() returns error? {
    int a = 1;
    float b = 2.1;
    decimal c = 3.24;

    // The `json` type allows `int|float|decimal`.
    json[] d = [a, b, c];

    // `toJsonString` will convert `int|float|decimal` into JSON 
    // numeric syntax.
    string e = d.toJsonString();

    io:println(e);

    // `fromJsonString` converts JSON numeric syntax into `int`, 
    // if possible, and otherwise `decimal`.
    json f = check e.fromJsonString();

    io:println(f);

    json[] g = <json[]> f;

    io:println(typeof g[0]);
    io:println(typeof g[1]);
    io:println(typeof g[2]);

    // `cloneWithType` or `ensureType` will convert from `int` or `decimal` into the user's
    // chosen numeric type.
    float h = check g[2].ensureType();

    io:println(h);

    // `-0` is an edge case: represented as `float`.
    string i = "-0";

    io:println(typeof check i.fromJsonString());
    return;
}
```

#### Output

```go
bal run json_numbers.bal
[1, 2.1, 3.24]
[1,2.1,3.24]
typedesc 1
typedesc 2.1
typedesc 3.24
3.24
typedesc -0.0
```
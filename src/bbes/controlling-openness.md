# Controlling Openness

 Use `record {| ... |}` to describe a `record` type that allows exclusively what is specified in the body.
 Use `T...` to allow other fields of type `T`. `map<T>` is same as `record {| T...; |}`.

```go
import ballerina/io;

type Coord record {|
    float x;
    float y;
|};

Coord x = { x: 1.0, y: 2.0 };

// `x` is a `map` with `float` values.
map<float> m1 = x;

type Headers record {|
    string 'from;
    string to;
    string...;
|};

Headers h = {
    'from: "Jane", to: "John"
};

// `h` is a `map` with `string` values.
map<string> m2 = h;

public function main() {
    io:println(m1);
    io:println(m2);
}
```

#### Output

```go
bal run controlling_openness.bal
{"x":1.0,"y":2.0}
{"from":"Jane","to":"John"}
```
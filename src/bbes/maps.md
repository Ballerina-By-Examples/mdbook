# Maps

 The `map<T>` type is a `map` from strings to `T`. `map` syntax is similar to JSON. Maps are mutable: `m[k]` is an
 `lvalue`. `foreach` will iterate over the values of the `map`. `m[k]` gets entry for `k`; `nil` if missing.
 Use `m.get(k)` when you know that there is an entry for `k`. `m.keys()` can be used to iterate over keys,
 to get the keys as an `array` of strings. `==` and `!=` on maps is deep: two maps are equal if they
 have the same set of keys and the values for each key are equal.

```go
import ballerina/io;

public function main() {
    // Creates a `map` constrained by the type `int`.
    map<int> m = {
        "x": 1,
        "y": 2
    };

    // Gets the entry for `x`.
    int? v = m["x"];

    io:println(v);

    // Adds a new entry for `z`.
    m["z"] = 5;

    // Using `m["x"]` wouldn't work here because type would be `int?`,
    // not `int`.
    m["z"] = m.get("x");

}
```

#### Output

```go
bal run maps.bal
1
```
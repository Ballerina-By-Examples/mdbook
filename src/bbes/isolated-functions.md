# Isolated Functions

 A call to an `isolated` function is concurrency-safe if it is called with arguments
 that are safe at least until the call returns. <br></br>
 A function defined as `isolated`:
 <ul>
 <li>has access to mutable state only through its parameters</li>
 <li>has unrestricted access to immutable state</li>
 <li>can only call functions that are `isolated`</li>
 </ul>
 <br></br>
 <p>Constraints are enforced at compile-time. `isolated` is a part of the function type.
 Weaker concept than pure function.</p>

```go
import ballerina/io;

type R record {
    int v;
};

final int N = getN();

function getN() returns int {
    return 100;
}

// Can access mutable state that is passed as a parameter.
isolated function set(R r) returns R {
    // Can access non-`isolated` module-level state only if the variable
    // is `final` and the type is a subtype of `readonly` or
    // `isolated object {}`.
    r.v = N;

    return r;
}

R r = {v: 0};

// This is not an `isolated` function.
function setGlobal(int n) {

    r.v = n;
}

public function main() {
    setGlobal(200);
    io:println(r);
    io:println(set(r));
}
```

#### Output

```go
bal run isolated_functions.bal
{"v":200}
{"v":100}
```
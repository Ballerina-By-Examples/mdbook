# Combining Isolated Functions and Lock

 Combining `isolated` functions and `lock` allows `isolated` functions to use
 `lock` to access mutable module-level state.
 Key concept is `isolated` root. A value `r` is an `isolated` root if mutable state reachable
 from `r` cannot be reached from outside except through `r`. An expression is an
 `isolated` expression if it follows rules that guarantee that its value will be an
 `isolated` root. e.g.,
 <ul>
 <li>an expression with a type that is a subtype of `readonly` is always `isolated`</li>
 <li>an expression `[E1, E2]` is isolated if `E1` and `E2` are `isolated`</li>
 <li>an expression `f(E1, E2)` is `isolated` if `E1` and `E1` are `isolated`, and
 the type of `f` is an `isolated` function.</li>
 </ul>

```go
import ballerina/io;

type R record {
    int v;
};

// The initialization expression of an `isolated` variable
// has to be an `isolated` expression, which itself will be
// an `isolated` root.
isolated R r = {v: 0};

isolated function setGlobal(int n) {
    // An `isolated` variable can be accessed within
    // a `lock` statement.
    lock {
        r.v = n;
    }

}

public function main() {
    setGlobal(200);
    // Accesses the `isolated` variable within a
    // `lock` statement.
    lock {
       io:println(r);
    }

}
```

#### Output

```go
bal run combining_isolated_functions_and_lock.bal
{"v":200}
```
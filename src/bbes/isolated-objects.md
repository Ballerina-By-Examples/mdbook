# Isolated Objects

 An object defined as `isolated` is similar to a module with `isolated` module-level variables.
 Mutable fields of an `isolated` object,
 <ul>
 <li>must be `private` and so can only be accessed using `self`</li>
 <li>must be initialized with an `isolated` expression</li>
 <li>must only be accessed within a `lock` statement</li>
 <li>`lock` statement must follow the same rules for `self` as for an `isolated` variable</li>
 <li>field is mutable unless it is `final` and has type that is subtype of `readonly`</li>
 </ul>
 <br></br>
 <p>Isolated root concept treats `isolated` objects as opaque. Isolated functions can access a `final`
 variable whose type is an `isolated` object.</p>

```go
import ballerina/io;

// An `isolated` object’s mutable state is `isolated` from the
// rest of the program.
isolated class Counter {
    // `n` is a mutable field.
    private int n = 0;

    isolated function get() returns int {
        lock {
            // `n` can only be accessed using `self`.
            return self.n;

        }
    }

    isolated function inc() {
        lock {
            self.n += 1;
        }
    }
}

public function main() {
    // The object’s mutable state is accessible only via the
    // object itself making it an “isolated root”.
    Counter c = new;

    c.inc();
    int v = c.get();
    io:println(v);
}
```

#### Output

```go
bal run isolated_objects.bal
1
```
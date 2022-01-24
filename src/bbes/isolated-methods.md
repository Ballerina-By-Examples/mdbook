# Isolated Methods

 Object methods can be `isolated`. An `isolated` method is same as an `isolated` function with
 `self` treated as a parameter. An `isolated` method call is concurrency-safe if both the object
 is safe and the arguments are safe. This is not quite enough for service concurrency: when
 a `listener` makes calls to a `remote` or `resource` method,
 <ul>
 <li>it can ensure the safety of arguments it passes</li>
 <li>it has no way to ensure the safety of the object itself (since the object may have fields)</li>
 </ul>

```go
import ballerina/io;

class EvenNumber {
    int i = 1;

    // `isolated` method.
    isolated function generate() returns int {

        lock {
            // Uses `self` to access mutable field `i`
            // within a `lock` statement.
            return self.i * 2;

        }
    }
}

public function main() {
    EvenNumber e = new;
    int c = e.generate();
    io:println(c);
}
```

#### Output

```go
bal run isolated_methods.bal
2
```
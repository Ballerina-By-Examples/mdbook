# Annotations

 Annotations start with `@tag` and they come before what they apply to.
 Unprefixed tags refer to standard platform-defined annotations and
 Prefixed tags refer to annotations declared in modules.
 `@tag` can be followed by record constructor expression.


```go
import ballerina/io;
// The `@display` annotation applies to the transform function.
@display {
    label: "Transform",
    iconPath: "transform.png"
}
public function transform(string s) returns string {
   return s.toUpperAscii();
}

public function main() {
    // The `@strand` annotation applies to the `start` action.
    future<int> fut = @strand { thread: "any" } start foo();

    int|error x = wait fut;
    io:println(x);
}

public function foo() returns int {
    return 10;
}
```

#### Output

```go
bal run annotations.bal
10
```
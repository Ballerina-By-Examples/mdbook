# Object

 Object is a separate basic type.
 An object value has named methods and fields.
 Methods and fields are in the same symbol space.
 A class both defines an object type and provides a way to construct an object.
 Apply `new` operator to a class to get an object.
 Call method using `obj.foo(args)`.
 Access field using `obj.x`.

```go
import ballerina/io;

class MyClass {
    int n;

    function init(int n) {
        self.n = n;
    }

    function func() {
        self.n += 1;
    }
}

public function main() {
    // Apply `new` operator to a class to get an object.
    MyClass x = new MyClass(1234);

    // Call method using `obj.foo(args)`.
    x.func();

    // Access field using `obj.x`.
    int n = x.n;

    io:println(n);
}
```

#### Output

```go
bal run object.bal
1235
```
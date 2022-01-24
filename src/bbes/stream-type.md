# Stream Type

 A `stream` represents a sequence of values that are generated as needed. The end of a `stream` is indicated with a
 termination value, which is `error` or `nil`. The type `stream<T,E>` is a `stream` where the members of the
 sequence are type `T` and termination value is type `E`. `stream<T>` means `stream<T,()>`. The `stream` type
 is a separate basic type, but like an object.

```go
import ballerina/io;

// Defines a class called `EvenNumberGenerator`.
// Each class has its own `next()` method, which gets 
// invoked when the stream's `next()` function
// gets called.
class EvenNumberGenerator {
    int i = 0;
    public isolated function next() returns record {| int value; |}|error? {
        self.i += 2;
        return { value: self.i };
    }
}

type ResultValue record {|
    int value;
|};

public function main() {
    EvenNumberGenerator evenGen = new();
    // Creates a `stream` passing an `EvenNumberGenerator` object
    // to the `stream` constructor.
    stream<int, error?> evenNumberStream = new(evenGen);

    var evenNumber = evenNumberStream.next();
    
    if (evenNumber is ResultValue) {
        io:println("Retrieved even number: ", evenNumber.value);
    }
}
```

#### Output

```go
bal run stream_type.bal
Retrieved even number: 2
```
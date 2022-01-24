# Random Numbers

 The `random` library provides functions related to random number generation.<br/><br/>
 For more information on the underlying module,
 see the [Random module](https:docs.central.ballerina.io/ballerina/random/latest/).

```go
import ballerina/io;
import ballerina/random;

public function main() returns error? {
    // Generates a random decimal number between 0.0 and 1.0.
    float randomDecimal = random:createDecimal();
    io:println("Random decimal number: ", randomDecimal);

    // Generates a random number between the given start(inclusive) and end(exclusive) values.
    int randomInteger = check random:createIntInRange(1, 100);
    io:println("Random integer number in range: ", randomInteger);
}
```

#### Output

```go
bal run random_numbers.bal
Random decimal number: 0.6146990788006506
Random integer number in range: 94
```
# Before and After Test

 The `before` attribute allows you to execute a function before a test function.
 Similarly, the `after` attribute can be used to execute a function after a test function.<br/><br/>
 These annotations can be used to set up the prerequisites and post actions for a test case.<br/><br/>
 For more information, see [Testing Ballerina Code](https:ballerina.io/learn/testing-ballerina-code/testing-quick-start/)
 and the [Test Module](https:docs.central.ballerina.io/ballerina/test/latest/).

```go
import ballerina/io;
import ballerina/test;

// Executed before the `testFunction` function.
function beforeFunc() {
    io:println("I'm the before function!");
}

// The Test function.
// The `before` and `after` attributes are used to define the functions
// that need to be executed before and after this test function.
@test:Config {
    before: beforeFunc,
    after: afterFunc
}
function testFunction() {
    io:println("I'm in test function!");
    test:assertTrue(true, msg = "Failed!");
}

// Executed after the `testFunction` function.
function afterFunc() {
    io:println("I'm the after function!");
}
```

#### Output

```go
bal test test_module

Compiling source
        ballerinatest/test_module:0.1.0

Running tests
    ballerinatest/test_module:0.1.0
I'm the before function!
I'm in test function!
I'm the after function!

        [pass] testFunction

        1 passing
        0 failing
        0 skipped
```
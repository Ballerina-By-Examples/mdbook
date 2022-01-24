# Guarantee Test Execution Order

 The `dependsOn` attribute can be used to define a list of functions that the test 
 function depends on. These functions will be executed before the execution of that test.<br/><br/>
 This allows you to ensure that the tests are being executed in the expected order.<br/><br/>
 For more information, see [Testing Ballerina Code](https:ballerina.io/learn/testing-ballerina-code/testing-quick-start/)
 and the [Test Module](https:docs.central.ballerina.io/ballerina/test/latest/).

```go
import ballerina/io;
import ballerina/test;

// This test function depends on the `testFunction3`.
@test:Config { 
    dependsOn: [testFunction3] }
function testFunction1() {
    io:println("I'm in test function 1!");
    test:assertTrue(true, msg = "Failed!");
}

// This test function depends on the `testFunction1`.
@test:Config { dependsOn: [testFunction1] }
function testFunction2() {
    io:println("I'm in test function 2!");
    test:assertTrue(true, msg = "Failed!");
}

// This will be executed without depending on other functions.
// However, since other functions depend on this function, it will be executed first.
@test:Config { }
function testFunction3() {
    io:println("I'm in test function 3!");
    test:assertTrue(true, msg = "Failed!");
}
```

#### Output

```go
bal test test_module

Compiling source
        ballerinatest/test_module:0.1.0

Running tests
    ballerinatest/test_module:0.1.0
I'm in test function 3!
I'm in test function 1!
I'm in test function 2!

                [pass] testFunction3
                [pass] testFunction1
                [pass] testFunction2

                3 passing
                0 failing
                0 skipped
```
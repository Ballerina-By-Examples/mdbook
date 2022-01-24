# Before and After Each

 The function specified with the `BeforeEach` annotation is executed before every test and
 the function specified with the `AfterEach` annotation is executed after every test within the test suite.
 This can be used for repeatedly initializing and tearing down test level aspects before every test function.<br/><br/>
 For more information, see [Testing Ballerina Code](https:ballerina.io/learn/testing-ballerina-code/testing-quick-start/)
 and the [Test Module](https:docs.central.ballerina.io/ballerina/test/latest/).

```go
import ballerina/io;
import ballerina/test;

// The `BeforeEach` function is executed before each test function.
@test:BeforeEach
function beforeEachFunc() {
    io:println("I'm the before each function!");
}

// The `AfterEach` function is executed after each test function.
@test:AfterEach
function afterEachFunc() {
    io:println("I'm the after each function!");
}

// A test function.
@test:Config { }
function testFunction1() {
    io:println("I'm in test function 1!");
    test:assertTrue(true, msg = "Failed!");
}

// Another test function.
@test:Config { }
function testFunction2() {
    io:println("I'm in test function 2!");
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
I'm the before each function!
I'm in test function 1!
I'm the after each function!
I'm the before each function!
I'm in test function 2!
I'm the after each function!

                [pass] testFunction1
                [pass] testFunction2

                2 passing
                0 failing
                0 skipped

```
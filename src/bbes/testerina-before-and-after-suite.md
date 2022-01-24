# Before and After Suite

 The `BeforeSuite` annotation allows you to execute a function before executing a test suite.
 Similarly, the `AfterSuite` annotation can be used to execute a function after a test suite.<br/><br/>
 A module is considered as a suite in the Test framework. <br></br>
 These annotations can be used to set up prerequisites and post actions for a test suite.
 For more information, see [Testing Ballerina Code](https:ballerina.io/learn/testing-ballerina-code/testing-quick-start/)
 and the [Test Module](https:docs.central.ballerina.io/ballerina/test/latest/).

```go
import ballerina/io;
import ballerina/test;

// Executed before all the test functions in the module.
@test:BeforeSuite
function beforeSuit() {
    io:println("I'm the before suite function!");
}

// A Test function.
@test:Config { }
function testFunction1() {
    io:println("I'm in test function 1!");
    test:assertTrue(true, msg = "Failed");
}

// A Test function.
@test:Config { }
function testFunction2() {
    io:println("I'm in test function 2!");
    test:assertTrue(true, msg = "Failed");
}

// Executed after all the test functions in the module.
@test:AfterSuite { }
function afterSuite() {
    io:println("I'm the after suite function!");
}
```

#### Output

```go
bal test test_module

Compiling source
        ballerinatest/test_module:0.1.0

Running tests
        ballerinatest/test_module:0.1.0
I'm the before suite function!
I'm in test function 1!
I'm in test function 2!
I'm the after suite function!

                [pass] testFunction1
                [pass] testFunction2

                2 passing
                0 failing
                0 skipped
```
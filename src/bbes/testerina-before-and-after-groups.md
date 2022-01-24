# Before and After Groups

 The function specified with the `BeforeGroups` annotation is executed once before all the tests belonging to the
 specified group is executed and the function specified with the `AfterGroups` annotation is executed once after all
 the tests belonging to the specified group is executed.<br/><br/>
 For more information, see [Testing Ballerina Code](https:ballerina.io/learn/testing-ballerina-code/testing-quick-start/)
 and the [Test Module](https:docs.central.ballerina.io/ballerina/test/latest/).

```go
import ballerina/io;
import ballerina/test;

// Executed before the first test function of the group `g1`.
@test:BeforeGroups { value:["g1"] }
function beforeGroupsFunc() {
    io:println("I'm the before groups function!");
}

// Executed after the last test function of the group `g1`.
@test:AfterGroups { value:["g1"] }
function afterGroupsFunc() {
    io:println("I'm the after groups function!");
}

// A test function belonging to the group `g1`.
@test:Config { groups: ["g1"]}
function testFunction1() {
    io:println("I'm in test function 1!");
    test:assertTrue(true, msg = "Failed!");
}

// Another test function.
@test:Config {}
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
I'm the before groups function!
I'm in test function 1!
I'm the after groups function!
I'm in test function 2!

	[pass] testFunction1
	[pass] testFunction2

	2 passing
	0 failing
	0 skipped
```
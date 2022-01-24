# Group Tests

 You can tag your test cases with a single group name or multiple group names (one or more).
 This allows you to control the execution of selected tests.<br/><br/>
 In order to execute tests belonging to a selected test group, you can name the 
 test groups that are to be executed when you run the tests.
 Likewise, you can exclude executing the selected test groups as well.<br/><br/>
 For more information, see [Testing Ballerina Code](https:ballerina.io/learn/testing-ballerina-code/testing-quick-start/)
 and the [Test Module](https:docs.central.ballerina.io/ballerina/test/latest/).

```go
import ballerina/io;
import ballerina/test;

// Belongs to the test group `g1`.
@test:Config { groups: ["g1"] }
function testFunction1() {
    io:println("I'm in test belonging to group g1!");
    test:assertTrue(true, msg = "Failed!");
}

// Belongs to the test groups `g1` and `g2`.
@test:Config { groups: ["g1", "g2"] }
function testFunction2() {
    io:println("I'm in test belonging to groups g1 and g2!");
    test:assertTrue(true, msg = "Failed!");
}

// Does not belong to any test group.
@test:Config { }
function testFunction3() {
    io:println("I'm the ungrouped test");
    test:assertTrue(true, msg = "Failed!");
}
```

#### Output

```go
# To run this sample, navigate to the directory that contains the
# `.bal` file, and execute the `ballerina test` command below.

# Run the tests belonging to the `g1` and `g2` groups
bal test --groups g1,g2 testerina_group_tests.bal

Compiling source
    testerina_group_tests.bal

Running tests

    testerina_group_tests.bal
I'm in test belonging to group g1!
I'm in test belonging to groups g1 and g2!

        [pass] testFunction1
        [pass] testFunction2

        2 passing
        0 failing
        0 skipped

# Run the tests belonging to the `g1` group
bal test --groups g1 testerina_group_tests.bal

Compiling source
    testerina_group_tests.bal

Running tests

    testerina_group_tests.bal
I'm in test belonging to group g1!
I'm in test belonging to groups g1 and g2!

        [pass] testFunction1
        [pass] testFunction2

        2 passing
        0 failing
        0 skipped

# Run all tests other than the tests belonging to the `g2` group
bal test --disable-groups g2 testerina_group_tests.bal

Compiling source
    testerina_group_tests.bal

Running tests

    testerina_group_tests.bal
I'm in test belonging to group g1!
I'm the ungrouped test

        [pass] testFunction1
        [pass] testFunction3

        2 passing
        0 failing
        0 skipped
```
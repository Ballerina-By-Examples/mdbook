# Function Mocking

 Mock functions allow you to hide the real function implementation and engage your own definition when running tests.
 This allows you to isolate your tests from the other modules and functions.<br/><br/>
 Function mocks can be stubbed with return values or with another user-defined function,
 which has the same signature as the original function.<br/><br/>
 For more information, see [Testing Ballerina Code](https:ballerina.io/learn/testing-ballerina-code/testing-quick-start/)
 and the [Test Module](https:docs.central.ballerina.io/ballerina/test/latest/).

```go
// Calls the `intAdd` function and returns the result.
public function addValues(int a, int b) returns int {
    return intAdd(a, b);
}

// Adds two integers and returns the result.
public function intAdd(int a, int b) returns int {
    return (a + b);
}
```

#### Output

```go

```

***

```go
// This demonstrates different ways to mock functions.
import ballerina/test;
import ballerina/io;

// Creates a `MockFunction` for stubbing calls to
// the `intAdd` function of the same module.
@test:Mock { functionName: "intAdd" }
test:MockFunction intAddMockFn = new();

@test:Config {}
function testReturn() {
    // Stubs the calls to return a specific value.
    test:when(intAddMockFn).thenReturn(20);
    // Stubs the calls to return a specific value when
    // specific arguments are provided.
    test:when(intAddMockFn).withArguments(0, 0).thenReturn(-1);

    test:assertEquals(intAdd(10, 6), 20, msg = "function mocking failed");
    test:assertEquals(intAdd(0, 0), -1,
            msg = "function mocking with arguments failed");
}

// Creates a `MockFunction` that should replace the
// imported `io:println` function.
@test:Mock {
    moduleName: "ballerina/io",
    functionName: "println"
}
test:MockFunction printlnMockFn = new();

int tally = 0;

// This has a function signature similar to the `io:println` function.
public function mockPrint(any|error... val) {
    tally = tally + 1;
}

@test:Config {}
function testCall() {
    // Stubs the calls to the `io:println` function
    // to invoke the `mockPrint` function instead.
    test:when(printlnMockFn).call("mockPrint");

    io:println("Testing 1");
    io:println("Testing 2");
    io:println("Testing 3");

    test:assertEquals(tally, 3);
}
```

#### Output

```go
# To run this sample, create a Ballerina project named `bbe_mocking` and create a `tests` directory inside.
# Replace the content of the `main.bal` and add the `main_test.bal` to the `tests` directory.
# Execute the `bal test` command below.
# Function mocking is not supported for testing single `.bal` files.

bal test bbe_mocking

Compiling source
        ballerinatest/bbe_mocking:0.1.0

Running Tests

        bbe_mocking

                [pass] testCall
                [pass] testReturn

                2 passing
                0 failing
                0 skipped
```
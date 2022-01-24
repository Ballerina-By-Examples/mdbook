# Data Driven Tests

 The Ballerina Test framework provides in-built support for data-driven tests.<br/><br/>
 You can specify a function that returns a set of data values as a data-provider to a test function.
 The test execution will iterate the same test function over the provided dataset.<br/><br/>
 For more information, see [Testing Ballerina Code](https:ballerina.io/learn/testing-ballerina-code/testing-quick-start/)
 and the [Test Module](https:docs.central.ballerina.io/ballerina/test/latest/).

```go
import ballerina/io;
import ballerina/test;

// The `dataProvider` attribute is used to specify a data-provider function for the test.
@test:Config {
    dataProvider: stringDataProvider
}
// Data is passed to the function as function parameters.
function testAddingValues(string fValue, string sValue, string result) returns error? {
    int value1 = check 'int:fromString(fValue);
    int value2 = check 'int:fromString(sValue);
    int result1 = check 'int:fromString(result);
    io:println("Input : [" + fValue + "," + sValue + "," + result + "]");
    test:assertEquals(value1 + value2, result1, msg = "Incorrect Sum");
}

// The data provider function, which returns a `string` value-set in array format.
function stringDataProvider() returns (string[][]) {
    return [["1", "2", "3"], ["10", "20", "30"], ["5", "6", "11"]];
}

@test:Config {
    dataProvider: mapDataProvider
}
function mapDataProviderTest(int value1, int value2, string fruit) returns error? {
    io:println("Input : [" + value1.toBalString() + "," + value2.toBalString() + "," + fruit + "]");
    test:assertEquals(value1, value2, msg = "The provided values are not equal");
    test:assertEquals(fruit.length(), 6);
}

// The data provider function, which returns a  data set as a map of tuples.
function mapDataProvider() returns map<[int, int, string]>|error {
    map<[int, int, string]> dataSet = {
        "banana": [10, 10, "banana"],
        "cherry": [5, 5, "cherry"]
    };
    return dataSet;
}
```

#### Output

```go
bal test test_module
Compiling source
        ballerinatest/test_module:0.1.0

Running tests
        ballerinatest/test_module:0.1.0
Input : [10,10,banana]
Input : [5,5,cherry]
Input : [1,2,3]
Input : [10,20,30]
Input : [5,6,11]

        [pass] mapDataProviderTest#banana
        [pass] mapDataProviderTest#cherry
        [pass] testAddingValues#0
        [pass] testAddingValues#1
        [pass] testAddingValues#2

        5 passing
        0 failing
        0 skipped
```
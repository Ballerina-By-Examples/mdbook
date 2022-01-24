# Assertions

 Testerina has in-built assertions that enable you to
 assert an outcome against an expected outcome.
 This example illustrates how to use different assertions.<br/><br/>
 For more information, see [Testing Ballerina Code](https:ballerina.io/learn/testing-ballerina-code/testing-quick-start/)
 and the [Test Module](https:docs.central.ballerina.io/ballerina/test/latest/).

```go
import ballerina/test;

@test:Config { }
function testAssertEquals() {
    json a = {name:"John Doe", age:25, address:{city:"Colombo", 
    country:"Sri Lanka"}};
    json b = {name:"John Doe", age:25, address:{city:"Colombo", 
    country:"Sri Lanka"}};
    // Asserts two values for value equality using `assertEquals`.
    test:assertEquals(a, b, msg = "JSON values are not equal");
}

@test:Config { }
function testAssertNotEquals() {
    string s1 = "abc";
    string s2 = "def";
    // Asserts two values for value inequality using `assertNotEquals`.
    test:assertNotEquals(s1, s2, msg = "String values are equal");
}

@test:Config { }
function testAssertTrue() {
    boolean value = true;
    // Asserts if the provided value is `true`.
    test:assertTrue(value, msg = "AssertTrue failed");
}

@test:Config { }
function testAssertFalse() {
    boolean value = false;
    // Asserts if the provided value is `false`.
    test:assertFalse(value, msg = "AssertFalse failed");
}

@test:Config { }
function testAssertFail() {
    boolean flag = true;
    if (flag) {
        return;
    }
    // Intentionally, throws an `AssertionError`.
    test:assertFail(msg = "AssertFailed");
}

class Person {
    public string name = "";
    public int age = 0;
    public Person? parent = ();
    private string email = "default@abc.com";
    string address = "No 20, Palm grove";
}

@test:Config { }
function testAssertExactEquals() {
    Person person1 = new;
    Person person2 = person1;
    // Compares the values for exact equality i.e. whether both refer to the same entity.
    test:assertExactEquals(person1, person2,
        msg = "Objects are not exactly equal");
}

@test:Config { }
function testAssertNotExactEquals() {
    Person person1 = new;
    Person person2 = new;
    // Compares the values for the negation of exact equality.
    test:assertNotExactEquals(person1, person2,
        msg = "Objects are exactly equal");
}
```

#### Output

```go
bal test test_module

Compiling source
        ballerinatest/test_module:0.1.0

Running tests
    ballerinatest/test_module:0.1.0

                [pass] testAssertEquals
                [pass] testAssertExactEquals
                [pass] testAssertFail
                [pass] testAssertFalse
                [pass] testAssertNotEquals
                [pass] testAssertNotExactEquals
                [pass] testAssertTrue

                7 passing
                0 failing
                0 skipped

```
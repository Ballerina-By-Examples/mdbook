# Object Mocking

 Object mocking enables controlling the values of member variables and the behavior of
 the member functions of an object. Mocking of objects can be done in two ways. <br/><br/>
 1. Creating a test double - providing an equivalent mock object in place of the real<br/>
 2. Stubbing the member function or member variable - stubbing the behavior of functions
 and values of variables<br/><br/>
 Creating a test double is suitable when a single mock function/object can be used
 throughout all tests whereas stubbing is ideal when defining different behaviors for
 different test cases is required.<br/><br/>
 For more information, see [Testing Ballerina Code](https:ballerina.io/learn/testing-ballerina-code/testing-quick-start/)
 and the [Test Module](https:docs.central.ballerina.io/ballerina/test/latest/).

```go
import ballerina/http;
import ballerina/io;
import ballerina/email;

// Sample client that you can use for member access.
public client class ExampleClient {
    public string id;

    public function init(string id) {
        self.id = id;
    }
}

// Client objects are defined globally to be able to replace in the test files.
http:Client clientEndpoint = check new("http://postman-echo.com");
email:SmtpClient smtpClient = check new("localhost", "admin", "admin");
ExampleClient exampleClient = new("originalId");

// Performs two `GET` requests to the specified
// endpoint and returns the response.
function performGet() returns @tainted http:Response {
    io:println("Executing the 1st GET request");
    http:Response response = <http:Response> 
    checkpanic clientEndpoint -> get("/headers");
    io:println("Status code: ", response.statusCode.toString());

    if (response.statusCode == 200) {
        io:println("Executing the 2nd GET request");
        response = <http:Response> checkpanic
        clientEndpoint -> get("/get?test=123",
            {"Sample-Name": "http-client-connector"});
        io:println("Status code: ", response.statusCode.toString());
    }
    return response;
}

// Sends an email to the specified email addresses
// and returns an error if found.
function sendNotification(string[] emailIds) returns error? {
    email:Message msg = {
        'from: "builder@abc.com",
        subject: "Error Alert ...",
        to: emailIds,
        body: ""
    };
    return smtpClient -> sendMessage(msg);
}
```

#### Output

```go

```

***

```go
// This demonstrates different ways to mock a client object.
import ballerina/test;
import ballerina/http;
import ballerina/email;

// The test double of the `http:Client` object with the
// implementation of the required functions.
public client class MockHttpClient {
    remote isolated function get(@untainted string path,
    map<string|string[]>? headers = (),
    http:TargetType targetType = http:Response) returns
    http:Response | http:PayloadType | http:ClientError {
        http:Response response = new;
        response.statusCode = 500;
        return response;
    }
}

@test:Config { }
function testTestDouble() {
    // Creates and assigns the defined test-double.
    clientEndpoint = test:mock(http:Client, new MockHttpClient());
    http:Response res = performGet();
    test:assertEquals(res.statusCode, 500);
}

@test:Config { }
function testReturn() {
    // Creates and assigns a default mock object,
    // which subsequently needs to be stubbed.
    clientEndpoint = test:mock(http:Client);
    // Stubs the `get` function to return the specified HTTP response.
    test:prepare(clientEndpoint).when("get").thenReturn(new http:Response());
    http:Response res = performGet();
    test:assertEquals(res.statusCode, 200);
}

@test:Config { }
function testReturnSequence() {
    http:Response mockResponse = new;
    mockResponse.statusCode = 404;

    clientEndpoint = test:mock(http:Client);
    // Stubs the `get` function to return the specified HTTP response
    // for each call (i.e., The first call will return the status code `200`
    // and the second call will return the status code `404`).
    test:prepare(clientEndpoint).when("get").thenReturnSequence(
        new http:Response(), mockResponse);
    http:Response res = performGet();
    test:assertEquals(res.statusCode, 404);
}

@test:Config { }
function testReturnWithArgs() {
    http:Response mockResponse = new;
    mockResponse.statusCode = 404;
    clientEndpoint = test:mock(http:Client);
    // This stubs the `get` function to return the specified HTTP response when the specified
    // argument is passed.
    test:prepare(clientEndpoint).when("get").
    withArguments("/headers").thenReturn(mockResponse);
    // The object and record types should be denoted by the `test:ANY` constant.
    test:prepare(clientEndpoint).when("get").withArguments("/get?test=123")
        .thenReturn(mockResponse);
    http:Response res = performGet();
    test:assertEquals(res.statusCode, 404);
}

@test:Config { }
function testSendNotification() {
    smtpClient = test:mock(email:SmtpClient);
    // Stubs the `send` method of the `mockSmtpClient` to do nothing.
    // This is used for functions with an optional or no return type.
    test:prepare(smtpClient).when("sendMessage").doNothing();
    string[] emailIds = ["user1@test.com", "user2@test.com"];
    error? err = sendNotification(emailIds);
    test:assertEquals(err, ());
}

@test:Config {}
function testMemberVariable() {
    string mockId = "test";
    lock {
        exampleClient = test:mock(ExampleClient);
        // Stubs the value of the `id` to return the specified string.
        test:prepare(exampleClient).getMember("id").thenReturn(mockId);
        test:assertEquals(exampleClient.id, mockId);
    }
}
```

#### Output

```go
# To run this sample, create a Ballerina project named `bbe_mocking` and create a `tests` directory inside.
# Replace the content of the `main.bal` and add the `main_test.bal` to the `tests` directory.
# Execute the `bal test` command below.

bal test bbe_mocking
Compiling source
        ballerinatest/bbe_mocking:0.1.0

Running Tests

        bbe_mocking
Executing the 1st GET request
Status code: 200
Executing the 2nd GET request
Status code: 200
Executing the 1st GET request
Status code: 200
Executing the 2nd GET request
Status code: 404
Executing the 1st GET request
Status code: 404
Executing the 1st GET request
Status code: 500

                [pass] testMemberVariable
                [pass] testReturn
                [pass] testReturnSequence
                [pass] testReturnWithArgs
                [pass] testSendNotification
                [pass] testTestDouble

                6 passing
                0 failing
                0 skipped
```
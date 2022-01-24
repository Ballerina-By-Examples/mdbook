# Cookies

 This example demonstrates how to handle HTTP cookies in a Ballerina service and client.
 For more information on the underlying module,
 see the [HTTP module](https:docs.central.ballerina.io/ballerina/http/latest/).

```go
import ballerina/http;

listener http:Listener serverEP = new (9095);

service /cookieDemo on serverEP {

    resource function post login(http:Request req)
            returns http:Response|http:BadRequest {
        // Retrieve the JSON payload from the request as it
        // contains the login details of a user.
        json|error details = req.getJsonPayload();

        if (details is json) {
            // Retrieve the username and password.
            json|error name = details.name;
            json|error password = details.password;

            if (name is json && password is json) {
                // Check the password value.
                if (password == "p@ssw0rd") {

                    // [Create a new cookie](https://docs.central.ballerina.io/ballerina/http/latest/classes/Cookie)
                    // by setting `name` as the `username` and `value` as the logged-in user's name. Set the cookies
                    // path as `/` to apply it to all the resources in the service.
                    http:Cookie cookie = new("username", name.toString(),
                                                path = "/");

                    http:Response response = new;

                    // [Add the created cookie to the response](https://docs.central.ballerina.io/ballerina/http/latest/classes/Response#addCookie).
                    response.addCookie(cookie);

                    // Set a message payload to inform that the login has
                    // been succeeded.
                    response.setTextPayload("Login succeeded");
                    return response;
                }
            }
        }
        return {body: "Invalid request payload"};
    }

    resource function get welcome(http:Request req) returns string {
        // [Retrieve cookies from the request](https://docs.central.ballerina.io/ballerina/http/latest/classes/Request#getCookies).
        http:Cookie[] cookies = req.getCookies();

        // Get the cookie value of the `username`.
        http:Cookie[] usernameCookie = cookies.filter(function
                                (http:Cookie cookie) returns boolean {
            return cookie.name == "username";
        });

        if (usernameCookie.length() > 0) {
            string? user = usernameCookie[0].value;
            if (user is string) {
                // Respond with the username added to the welcome message.
                return "Welcome back " + user;

            } else {
                // If the user is `nil`, send a login message.
                return "Please login";
            }
        } else {
            // If the `username` cookie is not presented, send a login message.
            return "Please login";
        }
    }
}
```

#### Output

```go
bal run cookie_server.bal
```

***

```go
import ballerina/http;
import ballerina/log;

// HTTP client configurations associated with [enabling cookies](https://docs.central.ballerina.io/ballerina/http/latest/records/CookieConfig).
http:ClientConfiguration clientEPConfig = {
    cookieConfig: {
        enabled: true
    }
};

public function main() returns error? {
    // Create a new HTTP client by giving the URL and the client configuration.
    http:Client httpClient = check new("http://localhost:9095/cookieDemo",
                                  clientEPConfig);

    // Initialize an HTTP request.
    http:Request request = new;

    // Send a username and a password as a JSON payload to the backend.
    json jsonPart = {
        name: "John",
        password: "p@ssw0rd"
    };
    request.setJsonPayload(jsonPart);

    // Send an outbound request to the `login` backend resource.
    http:Response|error loginResp = httpClient->post("/login", request);

    if (loginResp is error) {
        log:printError("Login failed", 'error = loginResp);
    } else {
        // When the login is successful, make another request to the
        // `/welcome` resource of the backend service.
        // As cookies are enabled in the HTTP client, it automatically handles cookies
        // received with the login response and sends the relevant cookies
        // to the `welcome` service resource.
        string welcomeResp = check httpClient->get("/welcome");

        // A welcome message with the sent username will get printed.
        log:printInfo(welcomeResp);
    }
}
```

#### Output

```go
bal run http_client.bal
time = 2020-12-15 16:14:08,691 level = INFO  module = "" message = "Welcome back John"
```
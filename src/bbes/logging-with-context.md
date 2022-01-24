# Logging with Context

 The Ballerina Log API contains the application log handling functions.<br/><br/>
 For more information on the underlying module,
 see the [Log module](https:docs.central.ballerina.io/ballerina/log/latest/).

```go
import ballerina/log;
import ballerina/random;
import ballerina/time;

public function main() {
    // The Ballerina log API provides functions to log at four levels, which are
    // `DEBUG`, `ERROR`, `INFO`, and `WARN`.
    // You can pass key/value pairs where the values are function pointers.
    // These functions can return values, which change dynamically.
    // The following log prints the current UTC time as a key/value pair.
    log:printInfo("info log",
                  current_time = isolated function() returns string {
                      return time:utcToString(time:utcNow());});
    // The following log prints a random percentage as a key/value pair.
    log:printInfo("info log",
                   percentage = isolated function() returns float {
                       return random:createDecimal() * 100.0;});
}
```

#### Output

```go
bal run logging_with_context.bal
time = 2021-05-25T10:34:25.460+05:30 level = INFO module = "" message = "info log" current_time = "2021-05-25T05:04:25.473981Z"
time = 2021-05-25T10:34:25.487+05:30 level = INFO module = "" message = "info log" percentage = 38.4141353500368
```
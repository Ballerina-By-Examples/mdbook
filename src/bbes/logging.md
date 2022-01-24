# Logging

 The Ballerina Log API contains the application log handling functions.<br/><br/>
 For more information on the underlying module,
 see the [Log module](https:docs.central.ballerina.io/ballerina/log/latest/).

```go
import ballerina/log;

public function main() {
    // The Ballerina log API provides functions to log at four levels, which are
    // `DEBUG`, `ERROR`, `INFO`, and `WARN`.
    log:printDebug("debug log");
    log:printError("error log");
    log:printInfo("info log");
    log:printWarn("warn log");

    // You can pass any number of key/value pairs, which need to be displayed in the log message.
    // These can be of the `anydata` type including int, string, and boolean.
    log:printInfo("info log", id = 845315, name = "foo", successful = true);

    // Optionally, an error can be passed to the functions.
    error e = error("something went wrong!");
    log:printError("error log with cause", 'error = e, id = 845315,
        name = "foo");
}
```

#### Output

```go
bal run logging.bal
time = 2021-05-25T11:29:58.290+05:30 level = DEBUG module = "" message = "debug log"
time = 2021-05-25T11:29:58.305+05:30 level = ERROR module = "" message = "error log"
time = 2021-05-25T11:29:58.306+05:30 level = INFO module = "" message = "info log"
time = 2021-05-25T11:29:58.307+05:30 level = WARN module = "" message = "warn log"
time = 2021-05-25T11:29:58.307+05:30 level = INFO module = "" message = "info log" name = "foo" id = 845315 successful = true
time = 2021-05-25T11:29:58.317+05:30 level = ERROR module = "" message = "error log with cause" error = "something went wrong!" name = "foo" id = 845315
```
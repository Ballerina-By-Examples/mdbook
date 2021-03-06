# Configure Logging

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
}
```

#### Output

```go
bal run logging_configuration.bal
time = 2021-05-25T11:06:54.998+05:30 level = ERROR module = "" message = "error log"
time = 2021-05-25T11:06:55.009+05:30 level = INFO module = "" message = "info log"
time = 2021-05-25T11:06:55.010+05:30 level = WARN module = "" message = "warn log"
# As shown in the output, only the `INFO` and higher level logs are logged by default.

# The log level can be configured via a Ballerina configuration file.
# To set the global log level to `DEBUG`, place the entry given below in the `Config.toml` file and run the sample.
# ```
# [ballerina.log]
# level = "DEBUG"
# ```
time = 2021-05-25T11:11:24.898+05:30 level = DEBUG module = "" message = "debug log"
time = 2021-05-25T11:11:24.914+05:30 level = ERROR module = "" message = "error log"
time = 2021-05-25T11:11:24.915+05:30 level = INFO module = "" message = "info log"
time = 2021-05-25T11:11:24.915+05:30 level = WARN module = "" message = "warn log"
# As shown in the output, now the `DEBUG` and higher level logs are logged.

# Each module can also be assigned its own log level. To assign a
# log level to a module, provide the following entry in the `Config.toml` file:
#
# ```
# [[ballerina.log.modules]]
# name = "[ORG_NAME]/[MODULE_NAME]"
# level = "[LOG_LEVEL]"
# ```

# By default, log messages are logged to the console in the LogFmt format.
# To set the output format to JSON, place the entry given below in the `Config.toml` file and run the sample.
# ```
# [ballerina.log]
# format = "json"
# ```
{"time":"2021-05-25T11:14:43.986+05:30", "level":"ERROR", "module":"", "message":"error log"}
{"time":"2021-05-25T11:14:44.005+05:30", "level":"INFO", "module":"", "message":"info log"}
{"time":"2021-05-25T11:14:44.006+05:30", "level":"WARN", "module":"", "message":"warn log"}
```
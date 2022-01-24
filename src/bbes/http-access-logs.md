# Access logs

 Ballerina supports HTTP access logs for HTTP services. The access log format used is the combined log format.
 To enable access logs, set `console=true` under the `ballerina.http.accessLogConfig` in the `Config.toml` file.
 Also, the `path` field can be used to specify the file path to save the access logs.<br/><br/>
 For more information on the underlying module,
 see the [HTTP module](https:docs.central.ballerina.io/ballerina/http/latest/).

```go
import ballerina/http;

service / on new http:Listener(9095) {

    resource function get hello() returns string {
        return "Successful";
    }
}
```

#### Output

```go
# Run the service by setting the configurations in the `Config.toml` file as follows to have logs in the console.
echo '[ballerina.http.accessLogConfig]
console = true' > Config.toml

bal run http_access_logs.bal
ballerina: HTTP access log enabled
0:0:0:0:0:0:0:1 - - [06/Oct/2021:18:54:32 +0530] "GET /hello HTTP/1.1" 200 10 "-" "curl/7.64.1"

# Else, change the `Config.toml` file as follows to direct the log to the specified file.
echo '[ballerina.http.accessLogConfig]
path = "testAccessLog.txt"' > Config.toml

bal run http_access_logs.bal
ballerina: HTTP access log enabled
```
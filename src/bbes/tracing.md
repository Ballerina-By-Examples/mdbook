# Distributed Tracing

 Ballerina supports Observability out of the box, and Tracing is one of the three important aspects of
 Observability. To observe Ballerina code, the build time flag `--observability-included` should be given along with the
 `Config.toml` file when starting the service. The `Config.toml` file contains the required runtime configurations related to observability.
 The developers can trace their code blocks and measure the time incurred during the actual runtime execution.
 They can choose to hook their measurement with the default trace created or can create a completely new trace.<br/><br/>
 For more information about configs and observing applications, see [Observing Ballerina Code](https:ballerina.io/learn/observing-ballerina-code/).

```go
import ballerina/http;
import ballerina/log;
import ballerina/observe;
import ballerina/lang.runtime;
import ballerinax/jaeger as _;

// Simple `Hello` HTTP Service
service /hello on new http:Listener(9234) {

    // Resource functions are invoked with the HTTP caller and the
    // incoming request as arguments.
    resource function get sayHello(http:Caller caller, http:Request req)
            returns error? {
        http:Response res = new;

        //Start a child span attaching to the generated system span.
        int spanId = check observe:startSpan("MyFirstLogicSpan");

        //Start a new root span without attaching to the system span.
        int rootParentSpanId = observe:startRootSpan("MyRootParentSpan");
        // Some actual logic will go here, and for example, we have introduced some delay with the sleep.
        runtime:sleep(1);
        //Start a new child span for the `MyRootParentSpan` span.
        int childSpanId = check observe:startSpan("MyRootChildSpan", (),
                                                            rootParentSpanId);
        // Some actual logic will go here, and for example, we have introduced some delay with the sleep.
        runtime:sleep(1);
        //Finish the `MyRootChildSpan` span.
        error? result = observe:finishSpan(childSpanId);
        if (result is error) {
            log:printError("Error in finishing span", 'error = result);
        }
        // Some actual logic will go here, and for example, we have introduced some delay with the sleep.
        runtime:sleep(1);
        //Finish the `MyRootParentSpan` span.
        result = observe:finishSpan(rootParentSpanId);
        if (result is error) {
            log:printError("Error in finishing span", 'error = result);
        }

        //Some actual logic will go here, and for example, we have introduced some delay with the sleep.
        runtime:sleep(1);

        //Finish the created child `MyFirstLogicSpan` span, which was attached to the system trace.
        result = observe:finishSpan(spanId);
        if (result is error) {
            log:printError("Error in finishing span", 'error = result);
        }
        //Use a util method to set a string payload.
        res.setPayload("Hello, World!");

        //Send the response back to the caller.
        result = caller->respond(res);

        if (result is error) {
            log:printError("Error sending response", 'error = result);
        }

        return ();
    }
}
```

#### Output

```go
# Jaeger is the default tracing tool used in Ballerina. To start the Jaeger execute the below command.
docker run -d -p 13133:13133 -p 16686:16686 -p 55680:55680 jaegertracing/opentelemetry-all-in-one

# To start the service, navigate to the directory that contains the
# `.bal` file and execute the `bal run` command below with the `--observability-included` build time flag and the `Config.toml` runtime configuration file.
BAL_CONFIG_FILES=Config.toml bal run --observability-included tracing.bal

ballerina: started publishing traces to Jaeger on localhost:55680
```
# Counter-Based Metrics

 Ballerina supports Observability out of the box and Metrics is one of the three important aspects of 
 Observability. To observe Ballerina code, the `--observability-included` build time flag should be given along with the
 `Config.toml` file when starting the service. The `Config.toml` file contains the required runtime configurations related to observability.
 You can define and use metrics to measure your own logic. A counter is one type of the metrics that is
 supported by default in Ballerina, and it is a cumulative metric that represents a single monotonically-increasing
 counter whose value can only increase or be reset to zero.<br/><br/>
 For more information about configs and observing applications, see [Observing Ballerina Code](https:ballerina.io/learn/observing-ballerina-code/).

```go
import ballerina/http;
import ballerina/io;
import ballerina/log;
import ballerina/observe;
import ballerinax/prometheus as _;

//Create a counter as a global variable in the service with the optional field description.
observe:Counter globalCounter = new ("total_orders",
                                    desc = "Total quantity required");

service /onlineStoreService on new http:Listener(9090) {

    resource function get makeOrder(http:Caller caller, http:Request req) {
        //Incrementing the global counter defined with the default value 1.
        globalCounter.increment();

        //Create a counter with simply a name.
        observe:Counter localCounter = new ("local_operations");
        localCounter.increment();
        //Increment the value of the counter by 20.
        localCounter.increment(20);

        //Create a counter with optional fields description, and tags.
        observe:Counter registeredCounter = new ("total_product_order_quantity",
            desc = "Total quantity required",
            tags = {prodName: "HeadPhone", prodType: "Electronics"});

        //Register the counter instance, therefore it is stored in the global registry and can be reported to the
        //metrics server such as Prometheus. Additionally, this operation will register to the global registry for the
        //first invocation and will throw an error if there is already a registration of different metrics instance
        //or type. Subsequent invocations of register() will simply retrieve the stored metrics instance
        //for the provided name and tags fields, and use that instance for the subsequent operations on the
        //counter instance.
        error? result = registeredCounter.register();
        if (result is error) {
            log:printError("Error in registering counter", 'error = result);
        }

        //Increase the amount of the registered counter instance by amount 10.
        registeredCounter.increment(10);

        //Get the value of the counter instances.
        io:println("------------------------------------------");
        io:println("Global Counter = ", globalCounter.getValue());
        io:println("Local Counter = ", localCounter.getValue());
        io:println("Registered Counter = ", registeredCounter.getValue());
        io:println("------------------------------------------");

        //Send reponse to the client.
        http:Response res = new;
        // Use a util method to set a string payload.
        res.setPayload("Order Processed!");

        // Send the response back to the caller.
        result = caller->respond(res);
        if (result is error) {
            log:printError("Error sending response", 'error = result);
        }
    }
}
```

#### Output

```go
# To start the service, navigate to the directory that contains the
# `.bal` file and execute the `bal run` command below with the `--observability-included` build time flag and the `Config.toml` runtime configuration file.
BAL_CONFIG_FILES=Config.toml bal run --observability-included counter_metrics.bal

ballerina: started Prometheus HTTP listener 0.0.0.0:9797
------------------------------------------
Global Counter = 1
Local Counter = 21
Registered Counter = 10
------------------------------------------
------------------------------------------
Global Counter = 2
Local Counter = 21
Registered Counter = 20
------------------------------------------
------------------------------------------
Global Counter = 3
Local Counter = 21
Registered Counter = 30
------------------------------------------
```
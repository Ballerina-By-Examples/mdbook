# Gauge-Based Metrics

 Ballerina supports Observability out of the box and Metrics is one of the three important aspects of the
 Observability. To observe Ballerina code, the build time flag `--observability-included` should be given along with the
 `Config.toml` file when starting the service. The `Config.toml` file contains the required runtime configurations related to observability.
 The developers can define and use metrics to measure their own logic. A gauge is one type of the metrics that is
 supported by default in Ballerina, and it represents a single numerical value that can arbitrarily go up and down,
 and also based on the statistics configurations provided to the Gauge, it can also report the statistics such as max,
 min, mean, percentiles, etc.<br/><br/>
 For more information about configs and observing applications, see [Observing Ballerina Code](https:ballerina.io/learn/observing-ballerina-code/).

```go
import ballerina/http;
import ballerina/io;
import ballerina/log;
import ballerina/observe;
import ballerinax/prometheus as _;

//Create a gauge as a global variable in the service with the optional field description,
//default statistics configurations = { timeWindow: 600000, buckets: 5,
// and percentiles: [0.33, 0.5, 0.66, 0.99] }.
observe:Gauge globalGauge = new ("global_gauge", "Global gauge defined");

service /onlineStoreService on new http:Listener(9090) {

    resource function get makeOrder(http:Caller caller, http:Request req) {
        io:println("------------------------------------------");
        //Incrementing the global gauge defined by 15.0.
        globalGauge.increment(15.0);
        //Log the current state of global gauge.
        printGauge(globalGauge);


        //Create a gauge with simply a name, and default statistics configurations.
        observe:Gauge localGauge = new ("local_operations");
        //Increment the local gauge by default value 1.0.
        localGauge.increment();
        //Increment the value of the gauge by 20.
        localGauge.increment(20.0);
        //Decrement the local gauge by default value 1.0.
        localGauge.decrement();
        //Decrement the value of the gauge by 20.
        localGauge.decrement(10.0);
        //Log the current state of local gauge.
        printGauge(localGauge);


        //Create a gauge with optional fields description, and tags defined.
        observe:Gauge registeredGaugeWithTags =
                  new ("registered_gauge_with_tags", "RegisteredGauge",
                       {property: "gaugeProperty", gaugeType: "RegisterType"});

        //Register the gauge instance, therefore it is stored in the global registry and can be reported to the
        //metrics server such as Prometheus. Additionally, this operation will register to the global registry for the
        //first invocation and will throw an error if there is already a registration of different metrics instance
        //or type. And subsequent invocations of register() will simply retrieve the stored metrics instance
        //for the provided name and tags fields, and use that instance for the subsequent operations on the
        //Counter instance.
        error? result = registeredGaugeWithTags.register();
        if (result is error) {
            log:printError("Error in registering gauge", 'error = result);
        }

        //Set the value of the gauge with the new value.
        registeredGaugeWithTags.increment();
        float value = registeredGaugeWithTags.getValue();
        float newValue = value * 12.0;
        registeredGaugeWithTags.setValue(newValue);
        //Log the current state of registered gauge with tags.
        printGauge(registeredGaugeWithTags);


        //Create a gauge with statistics disabled by passing empty statistics config array.
        observe:StatisticConfig[] statsConfigs = [];
        observe:Gauge gaugeWithNoStats = new ("gauge_with_no_stats",
                                        "Some description", (), statsConfigs);
        gaugeWithNoStats.setValue(100);
        printGauge(gaugeWithNoStats);


        //Create gauge with custom statistics config.
        observe:StatisticConfig config = {
            timeWindow: 30000,
            percentiles: [0.33, 0.5, 0.9, 0.99],
            buckets: 3
        };
        statsConfigs[0] = config;
        observe:Gauge gaugeWithCustomStats = new ("gauge_with_custom_stats",
                                        "Some description", (), statsConfigs);
        int i = 1;
        while (i < 6) {
            gaugeWithCustomStats.setValue(<float>(100 * i));
            i = i + 1;
        }
        //Log the current state of registered gauge with tags.
        printGauge(gaugeWithCustomStats);

        io:println("------------------------------------------");

        //Send response to the client.
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

function printGauge(observe:Gauge gauge) {
    //Get the statistics snapshot of the gauge.
    io:print("Gauge - " + gauge.name + " Snapshot: ");
    observe:Snapshot[]? snapshots = gauge.getSnapshot();
    json|error snapshotAsAJson = snapshots.cloneWithType(json);
    if snapshotAsAJson is json {
        io:println(snapshotAsAJson.toJsonString());
    }
    //Get the current value of the gauge.
    io:println("Gauge - ", gauge.name, " Current Value: "
        , gauge.getValue());
}
```

#### Output

```go
# To start the service, navigate to the directory that contains the
# `.bal` file and execute the `bal run` command below with the `--observability-included` build time flag and the `Config.toml` runtime configuration file.
BAL_CONFIG_FILES=Config.toml bal run --observability-included gauge_metrics.bal

ballerina: started Prometheus HTTP listener 0.0.0.0:9797
------------------------------------------
Gauge - global_gauge Snapshot: [{"timeWindow":600000, "mean":15.0, "max":15.0, "min":15.0, "stdDev":0.0, "percentileValues":[{"percentile":0.33, "value":15.0}, {"percentile":0.5, "value":15.0}, {"percentile":0.66, "value":15.0}, {"percentile":0.75, "value":15.0}, {"percentile":0.95, "value":15.0}, {"percentile":0.99, "value":15.0}, {"percentile":0.999, "value":15.0}]}]
Gauge - global_gauge Current Value: 15.0
Gauge - local_operations Snapshot: [{"timeWindow":600000, "mean":13.0390625, "max":21.1171875, "min":1.0, "stdDev":8.180620171277893, "percentileValues":[{"percentile":0.33, "value":10.0546875}, {"percentile":0.5, "value":10.0546875}, {"percentile":0.66, "value":20.1171875}, {"percentile":0.75, "value":20.1171875}, {"percentile":0.95, "value":21.1171875}, {"percentile":0.99, "value":21.1171875}, {"percentile":0.999, "value":21.1171875}]}]
Gauge - local_operations Current Value: 10.0
Gauge - registered_gauge_with_tags Snapshot: [{"timeWindow":600000, "mean":6.515625, "max":12.0546875, "min":1.0, "stdDev":5.515625, "percentileValues":[{"percentile":0.33, "value":1.0}, {"percentile":0.5, "value":1.0}, {"percentile":0.66, "value":12.0546875}, {"percentile":0.75, "value":12.0546875}, {"percentile":0.95, "value":12.0546875}, {"percentile":0.99, "value":12.0546875}, {"percentile":0.999, "value":12.0546875}]}]
Gauge - registered_gauge_with_tags Current Value: 12.0
Gauge - gauge_with_no_stats Snapshot: null
Gauge - gauge_with_no_stats Current Value: 100.0
Gauge - gauge_with_custom_stats Snapshot: [{"timeWindow":30000, "mean":300.7, "max":501.5, "min":100.0, "stdDev":141.775033062948, "percentileValues":[{"percentile":0.33, "value":200.5}, {"percentile":0.5, "value":301.5}, {"percentile":0.9, "value":501.5}, {"percentile":0.99, "value":501.5}]}]
Gauge - gauge_with_custom_stats Current Value: 500.0
------------------------------------------
------------------------------------------
Gauge - global_gauge Snapshot: [{"timeWindow":600000, "mean":22.53125, "max":30.0625, "min":15.0, "stdDev":7.53125, "percentileValues":[{"percentile":0.33, "value":15.0}, {"percentile":0.5, "value":15.0}, {"percentile":0.66, "value":30.0625}, {"percentile":0.75, "value":30.0625}, {"percentile":0.95, "value":30.0625}, {"percentile":0.99, "value":30.0625}, {"percentile":0.999, "value":30.0625}]}]
Gauge - global_gauge Current Value: 30.0
Gauge - local_operations Snapshot: [{"timeWindow":600000, "mean":13.0390625, "max":21.1171875, "min":1.0, "stdDev":8.180620171277893, "percentileValues":[{"percentile":0.33, "value":10.0546875}, {"percentile":0.5, "value":10.0546875}, {"percentile":0.66, "value":20.1171875}, {"percentile":0.75, "value":20.1171875}, {"percentile":0.95, "value":21.1171875}, {"percentile":0.99, "value":21.1171875}, {"percentile":0.999, "value":21.1171875}]}]
Gauge - local_operations Current Value: 10.0
Gauge - registered_gauge_with_tags Snapshot: [{"timeWindow":600000, "mean":55.4140625, "max":156.9921875, "min":1.0, "stdDev":61.38432884406833, "percentileValues":[{"percentile":0.33, "value":12.0546875}, {"percentile":0.5, "value":12.0546875}, {"percentile":0.66, "value":52.2421875}, {"percentile":0.75, "value":52.2421875}, {"percentile":0.95, "value":156.9921875}, {"percentile":0.99, "value":156.9921875}, {"percentile":0.999, "value":156.9921875}]}]
Gauge - registered_gauge_with_tags Current Value: 156.0
Gauge - gauge_with_no_stats Snapshot: null
Gauge - gauge_with_no_stats Current Value: 100.0
Gauge - gauge_with_custom_stats Snapshot: [{"timeWindow":30000, "mean":300.7, "max":501.5, "min":100.0, "stdDev":141.775033062948, "percentileValues":[{"percentile":0.33, "value":200.5}, {"percentile":0.5, "value":301.5}, {"percentile":0.9, "value":501.5}, {"percentile":0.99, "value":501.5}]}]
Gauge - gauge_with_custom_stats Current Value: 500.0
------------------------------------------
------------------------------------------
Gauge - global_gauge Snapshot: [{"timeWindow":600000, "mean":30.0625, "max":45.1875, "min":15.0, "stdDev":12.298479750223873, "percentileValues":[{"percentile":0.33, "value":15.0}, {"percentile":0.5, "value":30.0625}, {"percentile":0.66, "value":30.0625}, {"percentile":0.75, "value":45.1875}, {"percentile":0.95, "value":45.1875}, {"percentile":0.99, "value":45.1875}, {"percentile":0.999, "value":45.1875}]}]
Gauge - global_gauge Current Value: 45.0
Gauge - local_operations Snapshot: [{"timeWindow":600000, "mean":13.0390625, "max":21.1171875, "min":1.0, "stdDev":8.180620171277893, "percentileValues":[{"percentile":0.33, "value":10.0546875}, {"percentile":0.5, "value":10.0546875}, {"percentile":0.66, "value":20.1171875}, {"percentile":0.75, "value":20.1171875}, {"percentile":0.95, "value":21.1171875}, {"percentile":0.99, "value":21.1171875}, {"percentile":0.999, "value":21.1171875}]}]
Gauge - local_operations Current Value: 10.0
Gauge - registered_gauge_with_tags Snapshot: [{"timeWindow":600000, "mean":377.1927083333333, "max":1887.9921875, "min":1.0, "stdDev":676.7534301455432, "percentileValues":[{"percentile":0.33, "value":12.0546875}, {"percentile":0.5, "value":52.2421875}, {"percentile":0.66, "value":156.9921875}, {"percentile":0.75, "value":157.9921875}, {"percentile":0.95, "value":1887.9921875}, {"percentile":0.99, "value":1887.9921875}, {"percentile":0.999, "value":1887.9921875}]}]
Gauge - registered_gauge_with_tags Current Value: 1884.0
Gauge - gauge_with_no_stats Snapshot: null
Gauge - gauge_with_no_stats Current Value: 100.0
Gauge - gauge_with_custom_stats Snapshot: [{"timeWindow":30000, "mean":300.7, "max":501.5, "min":100.0, "stdDev":141.775033062948, "percentileValues":[{"percentile":0.33, "value":200.5}, {"percentile":0.5, "value":301.5}, {"percentile":0.9, "value":501.5}, {"percentile":0.99, "value":501.5}]}]
Gauge - gauge_with_custom_stats Current Value: 500.0
------------------------------------------
```
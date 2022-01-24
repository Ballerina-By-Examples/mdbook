# UTC Time

 This sample demonstrates how to obtain the current time from the epoch
 `1970-01-01T00:00:00`<br/><br/>
 For more information on the underlying module,
 see the [Time module](https:docs.central.ballerina.io/ballerina/time/latest/).

```go
import ballerina/io;
import ballerina/time;

public function main() {
    // Gets the current instant of the system clock (seconds from the epoch of
    // 1970-01-01T00:00:00). The returned `time:Utc` value represents seconds
    // from the epoch with nanoseconds precision.
    // The `time:Utc` is a tuple with `[int, decimal]`. The first member of the
    // tuple represents the number of seconds from the epoch. The second
    // member represents the rest of the nanoseconds from the epoch as a
    // fraction.
    time:Utc currentUtc = time:utcNow();
    io:println(`Number of seconds from the epoch: ${currentUtc[0]}s`);
    io:println(`Nanoseconds fraction: ${currentUtc[1]}s`);
}
```

#### Output

```go
bal run time_utc.bal
Number of seconds from the epoch: 1621839972s
Nanoseconds fraction: 0.005413000s
```
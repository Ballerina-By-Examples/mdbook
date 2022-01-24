# Schedule Job recurrence by Frequency

 A  `task:scheduleJobRecurByFrequency()` can be used to execute Ballerina jobs periodically.
 The `task:Job` and interval should be specified and optional configurations are start time,
 end time, and maximum count.
 For more information on the underlying module, 
 see the [Task module](https:docs.central.ballerina.io/ballerina/task/latest/).

```go
import ballerina/io;
import ballerina/lang.runtime;
import ballerina/task;

// Creates a job to be executed by the scheduler.
class Job {

    *task:Job;
    int i = 1;

    // Executes this function when the scheduled trigger fires.
    public function execute() {
        self.i += 1;
        io:println("MyCounter: ", self.i);
    }

    isolated function init(int i) {
        self.i = i;
    }
}

public function main() returns error? {

    // Schedules the task to execute the job every second.
    task:JobId id = check task:scheduleJobRecurByFrequency(new Job(0), 1);

    // Waits for nine seconds.
    runtime:sleep(9);

    // Unschedules the job.
    check task:unscheduleJob(id);
}
```

#### Output

```go
bal run task_frequency_job_execution.bal
MyCounter: 1
MyCounter: 2
MyCounter: 3
MyCounter: 4
MyCounter: 5
MyCounter: 6
MyCounter: 7
MyCounter: 8
MyCounter: 9
MyCounter: 10
```
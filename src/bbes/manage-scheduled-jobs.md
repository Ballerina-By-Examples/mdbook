# Manage Scheduled Jobs

 The `task` library provides functions to manage the scheduled jobs such as pause, resume,
 unschedule, and etc.<br/><br/>
 For more information on the underlying module,
 see the [Regex module](https:docs.central.ballerina.io/ballerina/regex/latest/).

```go
import ballerina/io;
import ballerina/lang.runtime;
import ballerina/task;
import ballerina/time;

// Creates a job to be executed by the scheduler.
class Job {

    *task:Job;
    int i = 1;
    string jobIdentifier;

    // Executes this function when the scheduled trigger fires.
    public function execute() {
        self.i += 1;
        io:println(self.jobIdentifier + ", MyCounter: ", self.i);
    }

    isolated function init(int i, string jobIdentifier) {
        self.i = i;
        self.jobIdentifier = jobIdentifier;
    }
}

public function main() returns error? {

    // Gets the current time.
    time:Utc currentUtc = time:utcNow();
    // Increases the time by three seconds to set the starting delay for the scheduling job.
    time:Utc newTime = time:utcAddSeconds(currentUtc, 5);
    // Gets the `time:Civil` for the given time.
    time:Civil time = time:utcToCivil(newTime);

    // Schedules the tasks to execute the job every second.
    task:JobId id1 = check task:scheduleJobRecurByFrequency(
                            new Job(0, "1st Job"), 1);
    task:JobId id2 = check task:scheduleJobRecurByFrequency(
                            new Job(0, "2nd Job"), 3);
    // Schedules the one-time job at the specified time.
    _ = check task:scheduleOneTimeJob(new Job(0, "3rd Job"), time);

    // Waits for 3 seconds.
    runtime:sleep(3);

    // Gets all the running jobs.
    task:JobId[] result = task:getRunningJobs();
    io:println("No of running jobs: ", result.length());

    // Pauses the specified job.
    check task:pauseJob(id1);
    io:println("Pasused the 1st job.");
    // Waits for 3 seconds.
    runtime:sleep(3);

    // Resumes the specified job.
    check task:resumeJob(id1);
    io:println("Resumed the 1st job.");

    // Gets all the running jobs.
    result = task:getRunningJobs();
    io:println("No of running jobs: ", result.length());

     // Waits for 3 seconds.
    runtime:sleep(3);

    // Unschedules the jobs.
    check task:unscheduleJob(id1);
    check task:unscheduleJob(id2);
}
```

#### Output

```go
bal run manage_scheduled_jobs.bal
1st Job, MyCounter: 1
2nd Job, MyCounter: 1
1st Job, MyCounter: 2
1st Job, MyCounter: 3
1st Job, MyCounter: 4
2nd Job, MyCounter: 2
No of running jobs: 3
Pasused the 1st job.
3rd Job, MyCounter: 1
2nd Job, MyCounter: 3
Resumed the 1st job.
1st Job, MyCounter: 5
1st Job, MyCounter: 6
No of running jobs: 2
1st Job, MyCounter: 7
1st Job, MyCounter: 8
1st Job, MyCounter: 9
1st Job, MyCounter: 10
2nd Job, MyCounter: 4
```
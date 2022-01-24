# Directory Listener

 The `Directory Listener` is used to listen to a directory in the local file system. 
 It notifies when new files are created in the directory or when the existing files are deleted or modified.<br/><br/>
 For more information on the underlying module, 
 see the [File module](https:docs.central.ballerina.io/ballerina/file/latest/).

```go
import ballerina/file;
import ballerina/log;

// In this example, the listener monitors any modifications done to a specific directory.
// Before running the example, change the value of the 'path' field 
// to indicate the path of the directory that you want the listener to monitor.
// As the recursive property is set to false,
// the listener does not monitor the child directories of the main directory
// that it listens to.
listener file:Listener inFolder = new ({
    path: "/home/ballerina/fs-server-connector/observed-dir",
    recursive: false
});

// The directory listener should have at least one of these predefined resources.
service "localObserver" on inFolder {

    // This function is invoked once a new file is created in the listening directory.
    remote function onCreate(file:FileEvent m) {
        log:printInfo("Create: " + m.name);
    }

    // This function is invoked once an existing file is deleted from the listening directory.
    remote function onDelete(file:FileEvent m) {
        log:printInfo("Delete: " + m.name);
    }

    // This function is invoked once an existing file is modified in the listening directory.
    remote function onModify(file:FileEvent m) {
        log:printInfo("Modify: " + m.name);
    }
}
```

#### Output

```go
# After running the sample, create a new file called `test1.txt` in the directory called `observed-dir`, modify it, and delete it.
bal run directory_listener.bal
time = 2020-12-12 13:49:08,497 level = INFO  module = "" message = "Create: /home/ballerina/fs-server-connector/observed-dir/test1.txt"
time = 2020-12-12 13:49:41,709 level = INFO  module = "" message = "Modify: /home/ballerina/fs-server-connector/observed-dir/test1.txt"
time = 2020-12-12 13:50:04,997 level = INFO  module = "" message = "Delete: /home/ballerina/fs-server-connector/observed-dir/test1.txt"
```
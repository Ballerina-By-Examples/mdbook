# Listener

 The FTP listener is used to receive file/directory changes that occur in a remote
 location using the FTP protocol. This sample includes receiving
 file/directory related change events from a listener with default
 configurations using the default port.<br/><br/>
 For more information on the underlying module, 
 see the [FTP module](https:docs.central.ballerina.io/ballerina/ftp/latest/).

```go
import ballerina/ftp;
import ballerina/io;

// Creates the listener with the connection parameters and the protocol-related
// configuration. The polling interval specifies the time duration between each
// poll performed by the listener in seconds. The listener listens to the files
// with the given file name pattern located in the specified path.
listener ftp:Listener remoteServer = check new({
    protocol: ftp:FTP,
    host: "ftp.example.com",
    auth: {
        credentials: {
            username: "user1",
            password: "pass456"
        }
    },
    port: 21,
    path: "/home/in",
    pollingInterval: 2,
    fileNamePattern: "(.*).txt"
});

// One or many services can listen to the FTP listener for the
// periodically-polled file related events.
service on remoteServer {

    // When a file event is successfully received, the `onFileChange` method is
    // called.
    remote function onFileChange(ftp:WatchEvent event) {

        // `addedFiles` contains the paths of the newly-added files/directories
        // after the last polling was called.
        foreach ftp:FileInfo addedFile in event.addedFiles {
            io:println("Added file path: " + addedFile.path);
        }

        // `deletedFiles` contains the paths of the deleted files/directories
        // after the last polling was called.
        foreach string deletedFile in event.deletedFiles {
            io:println("Deleted file path: " + deletedFile);
        }
    }
}
```

#### Output

```go
bal run ftp_listener.bal

# Paths of the newly-added and newly-deleted files/directories during the
# latest polling will be printed for each of the polled events.
```
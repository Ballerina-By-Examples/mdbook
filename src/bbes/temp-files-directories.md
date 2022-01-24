# Temp Files and Directories

 The Ballerina File API contains functions to perform temp file and directory operations.<br/><br/>
 For more information on the underlying module, 
 see the [File module](https:docs.central.ballerina.io/ballerina/file/latest/).

```go
import ballerina/file;
import ballerina/io;

public function main() returns error? {

    // Creates a temporary directory in the default `tmp` directory of the OS.
    string tmpDir = check file:createTempDir();
    io:println("Absolute path of the tmp directory: ", tmpDir);

    // Creates a temporary file in the default `tmp` directory of the OS.
    string tmpResult = check file:createTemp();
    io:println("Absolute path of the tmp file: ", tmpResult);

    // Creates a temporary file in a specific directory.
    string tmp2Result = check file:createTemp(dir = tmpDir);
    io:println("Absolute path of the tmp file: ", tmp2Result);
}
```

#### Output

```go
bal run temp_files_directories.bal
Absolute path of the tmp directory: /var/folders/f2/1s2f2mzd30ldl_fzxk4_gq3c0000gn/T/90eb0a6f-200a-454d-9285-f3264a71cd80
Absolute path of the tmp file: /var/folders/f2/1s2f2mzd30ldl_fzxk4_gq3c0000gn/T/9b0ce907-51cd-4f6b-98f0-d99566e3870d
Absolute path of the tmp file: /var/folders/f2/1s2f2mzd30ldl_fzxk4_gq3c0000gn/T/90eb0a6f-200a-454d-9285-f3264a71cd80/14c45332-37df-44d1-b24b-3dbcb7c7404c
```
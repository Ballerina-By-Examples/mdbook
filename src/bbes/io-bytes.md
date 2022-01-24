# Read/Write Bytes

 This example demonstrates how bytes can be read and written through the I/O APIs.<br/><br/>
 For more information on the underlying module, 
 see the [IO module](https:docs.central.ballerina.io/ballerina/io/latest/).

```go
import ballerina/io;

public function main() returns error? {
    // Initializes the image paths.
    string imagePath = "./files/ballerina.jpg";
    string imageCopyPath1 = "./files/ballerinaCopy1.jpg";
    string imageCopyPath2 = "./files/ballerinaCopy2.jpg";

    // Reads the file content as a byte array using the given file path.
    byte[] bytes = check io:fileReadBytes(imagePath);
    // Writes the already-read content to the given destination file.
    check io:fileWriteBytes(imageCopyPath1, bytes);
    io:println("Successfully copied the image as a byte array.");

    // Reads the file as a stream of blocks. The default block size is 4KB.
    // Here, the default size is overridden by the value 2KB.
    stream<io:Block, io:Error?> blockStream = check
    io:fileReadBlocksAsStream(imagePath, 2048);
    // If the file reading was successful, then,
    // the content will be written to the given destination file using the given stream.
    check io:fileWriteBlocksFromStream(imageCopyPath2, blockStream);
    io:println("Successfully copied the image as a stream.");
}
```

#### Output

```go
# In the directory, which contains the `.bal` file, create a directory named `files`,
# and add an image file named `ballerina.jpg` in it as follows.
# tree .
# ??? files
# ?   ??? ballerina.jpeg
# ??? io_bytes.bal
bal run io_bytes.bal
Successfully copied the image as a byte array.
Successfully copied the image as a stream.
```
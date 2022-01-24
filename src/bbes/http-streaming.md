# Streaming

 Ballerina supports HTTP input and output streaming capability based on the Ballerina `stream` type.<br/><br/>
 For more information on the underlying module, 
 see the [HTTP module](https:docs.central.ballerina.io/ballerina/http/latest/).

```go
import ballerina/http;
import ballerina/io;
import ballerina/mime;

// Creates an endpoint for the [client](https://docs.central.ballerina.io/ballerina/http/latest/clients/Client).
http:Client clientEndpoint = check new ("http://localhost:9090");

service /'stream on new http:Listener(9090) {

    resource function get fileupload() returns http:Response|error? {
        http:Request request = new;

        //[Sets the file](https://docs.central.ballerina.io/ballerina/http/latest/classes/Request#setFileAsPayload) as the request payload.
        request.setFileAsPayload("./files/BallerinaLang.pdf",
            contentType = mime:APPLICATION_PDF);

        //Sends the request to the client with the file content.
        http:Response clientResponse =
            check clientEndpoint->post("/stream/receiver", request);

        // forward received response to caller
        return clientResponse;
    }

    resource function post receiver(http:Caller caller,
                                    http:Request request) returns error? {
        //[Retrieve the byte stream](https://docs.central.ballerina.io/ballerina/http/latest/classes/Request#getByteStream).
        stream<byte[], io:Error?> streamer = check request.getByteStream();

        //Writes the incoming stream to a file using `io:fileWriteBlocksFromStream` API by providing the file location to which the content should be written to.
        check io:fileWriteBlocksFromStream(
                                    "./files/ReceivedFile.pdf", streamer);
        check streamer.close();
        check caller->respond("File Received!");
    }
}
```

#### Output

```go
# In the directory, which contains the `.bal` file, create a directory named `files`,
# and add a PDF file named `BallerinaLang.pdf` in it.
bal run http_streaming.bal
```
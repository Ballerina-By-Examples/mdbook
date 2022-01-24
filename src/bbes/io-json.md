# Read/Write JSON

 This sample demonstrates how to read JSON content from a file and write JSON content
 to a file using the character channel, `readJson()`, and `writeJson()` of the I/O API.<br/><br/>
 For more information on the underlying module, 
 see the [IO module](https:docs.central.ballerina.io/ballerina/io/latest/).

```go
import ballerina/io;

public function main() returns error? {
    // Initializes the JSON file path and content.
    string jsonFilePath = "./files/jsonFile.json";
    json jsonContent = {"Store": {
            "@id": "AST",
            "name": "Anne",
            "address": {
                "street": "Main",
                "city": "94"
            },
            "codes": ["4", "8"]
        }};

    // Writes the given JSON to a file.
    check io:fileWriteJson(jsonFilePath, jsonContent);
    // If the write operation was successful, then, performs a read operation to read the JSON content.
    json readJson = check io:fileReadJson(jsonFilePath);
    io:println(readJson);
}
```

#### Output

```go
bal run io_json.bal
{"Store":{"@id":"AST","name":"Anne","address":{"street":"Main","city":"94"},"codes":["4","8"]}}
```
# Read/Write XML

 This example demonstrates how XML content can be read from a file and written
 to a file using a character channel and the `readXml()` and `writeXml()` functions of the I/O API.<br/><br/>
 For more information on the underlying module, 
 see the [IO module](https:docs.central.ballerina.io/ballerina/io/latest/).

```go
import ballerina/io;

public function main() returns error? {
    // Initializes the XML file path and content.
    string xmlFilePath = "./files/xmlFile.xml";
    xml xmlContent = xml `<book>The Lost World</book>`;

    // Writes the given XML to a file.
    check io:fileWriteXml(xmlFilePath, xmlContent);
    // If the write operation was successful, then, performs a read operation to read the XML content.
    xml readXml = check io:fileReadXml(xmlFilePath);
    io:println(readXml);
}
```

#### Output

```go
bal run io_xml.bal
<book>The Lost World</book>
```
# URL Encode/Decode Operations

 Ballerina URL API supports encoding/decoding a URL or part of a URL.<br/><br/>
 For more information on the underlying module,
 see the [URL module](https:docs.central.ballerina.io/ballerina/url/latest/).

```go
import ballerina/url;
import ballerina/io;

public function main() returns error? {
    string value1 = "data=value";
    // Encoding a URL component into a string.
    string encoded = check url:encode(value1, "UTF-8");
    io:println("URL encoded value: ", encoded);

    string value2 = "data%3Dvalue";
    // Decoding an encoded URL component into a string.
    string decoded = check url:decode(value2, "UTF-8");
    io:println("URL decoded value: ", decoded);
}
```

#### Output

```go
bal run url_encode_decode.bal
URL encoded value: data%3Dvalue
URL decoded value: data=value
```
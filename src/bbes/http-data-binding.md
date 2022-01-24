# Service Data Binding

 HTTP service data binding helps to access the request payload through a resource signature parameter. The payload
 parameter should be declared with the `@Payload` annotation. `string`, `json`, `xml`, `byte[]`, record, and record[]
 are supported as parameter types. Binding failures will be responded with 400[Bad Request] response<br/><br/>
 For more information on the underlying module, 
 see the [HTTP module](https:docs.central.ballerina.io/ballerina/http/latest/).

```go
import ballerina/http;

type Student record {
    string Name;
    int Grade;
};

service /hello on new http:Listener(9090) {

    // The `Student` parameter in [Payload annotation](https://docs.central.ballerina.io/ballerina/http/latest/records/Payload)
    // represents the entity body of the inbound request.
    @http:ResourceConfig {
        consumes: ["application/json"]
    }
    resource function post bindStudent(@http:Payload Student student)
            returns json {
        string name = student.Name;
        return {Name: name};
    }

    //Binds the XML payload of the inbound request to the `store` variable.
    @http:ResourceConfig {
        consumes: ["application/xml"]
    }
    resource function post bindXML(@http:Payload xml store) returns xml {
        xml city = store.selectDescendants("{http://www.test.com}city");
        return city;
    }
}
```

#### Output

```go
bal run http_data_binding.bal
```
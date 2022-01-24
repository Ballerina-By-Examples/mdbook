# XML Templates

 `xml` values can be constructed using an XML template expression.
 Phase 2 processing for `xml` template tag parses strings using 
 the XML 1.0 Recommendation's grammar for content (what XML allows 
 between a start-tag and an end-tag).
 Interpolated expressions can be in content (`xml` or `string` values) 
 or in attribute values (`string` values).

```go
import ballerina/io;

string url = "https://ballerina.io";

xml content = 
    // `xml` values can be constructed using an XML template expression.
    // Attribute values can have `string` values as interpolated expressions.
    xml `<a href="${url}">Ballerina</a> is an <em>exciting</em> new language!`;

// Interpolated expressions can also be in content (`xml` or `string` values).
xml p = xml `<p>${content}</p>`;

public function main() {
    io:println(content);
    io:println(p);
}
```

#### Output

```go
bal run xml_templates.bal
<a href="https://ballerina.io">Ballerina</a> is an <em>exciting</em> new language!
<p><a href="https://ballerina.io">Ballerina</a> is an <em>exciting</em> new language!</p>
```
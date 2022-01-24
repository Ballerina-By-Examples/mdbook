# XML Data Model

 An `xml` value is a sequence representing the parsed content of an XML element. <br></br>
 An `xml` value has four kinds of items.
 <ul>
 <li>`element`, `processing instruction` and `comment` item correspond 1:1 to XML infoset items</li>
 <li>`text` item corresponds to one or more Character Information Items</li>
 </ul>
<br></br>
 <p>XML document is an `xml` sequence with only one `element` and no `text`. An `element` item is mutable
 and consists of:</p>
 <ul>
 <li>name: type `string`</li>
 <li>attributes: type `map<string>`</li>
 <li>children: type `xml`</li>
 </ul>
<br></br>
 <p>A `text` item is immutable.</p>
 <ul>
 <li>it has no identity: `==` is the same as `===`</li>
 <li>consecutive `text` items never occur in an `xml` value: they are always merged</li>
 </ul>

```go
import ballerina/io;

public function main() {
    // An XML element. There can be only one root element.
    xml x1 = xml `<book>The Lost World</book>`;
    io:println(x1);

    // An XML text.
    xml x2 = xml `Hello, world!`;
    io:println(x2);

    // An XML comment.
    xml x3 = xml `<!--I am a comment-->`;
    io:println(x3);

    // An XML processing instructions.
    xml x4 = xml `<?target data?>`;
    io:println(x4);

    // Multiple XML items can be combined to form a sequence of XML.
    // The resulting sequence is another XML on its own.
    xml x5 = x1 + x2 + x3 + x4;
    io:println(x5);

}
```

#### Output

```go
bal run xml.bal
<book>The Lost World</book>
Hello, world!
<!--I am a comment-->
<?target data?>
<book>The Lost World</book>Hello, world!<!--I am a comment--><?target data?>
```
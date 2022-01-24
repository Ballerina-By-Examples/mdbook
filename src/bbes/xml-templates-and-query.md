# XML Templates and Query

 XML templates can be combined with queries (e.g., you can have a template containing a query expression, which
 also contains a template).

```go
import ballerina/io;

type Person record {|
    string name;
    string country;
|};

function personsToXml(Person[] persons) returns xml {
    // Uses a template containing a query expression, which also contains a template.
    return xml`<data>${from var {name, country} in persons
           select xml`<person country="${country}">${name}</person>`}</data>`;

}

public function main() {
    Person[] persons = [
        {name: "Jane", country: "USA"},
        {name: "Mike", country: "Germany"}
    ];
    io:println(personsToXml(persons));
}
```

#### Output

```go
bal run xml_templates_and_query.bal
<data><person country="USA">Jane</person><person country="Germany">Mike</person></data>
```
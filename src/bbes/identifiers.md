# Identifiers

 Identifier syntax is similar to C. Keywords are reserved. 

```go
import ballerina/io;

// You can have Unicode identifiers.
function ?????????(string ????) {
    // Use \u{H} to specify character using Unicode code point in hex.
   io:println(???\u{E2D});

}

// Prefix reserved keywords with a single quote.
string 'from = "contact@ballerina.io";

// Prefix non-identifier character with a \.
string first\ name = "Ballerina";

public function main() {
    ?????????("????????");
}
```

#### Output

```go
bal run identifiers.bal
????????
```
# XMLNS Declarations

 The `xmlns` declarations are like import declarations, but bind the prefix to a namespace URL rather than
 a module. The `xmlns` declarations in the Ballerina module provide namespace context for parsing `xml`
 templates. The Qualified names in Ballerina modules are expanded into `strings` using the `xmlns`
 declarations in the module. The `xmlns` declarations are also allowed at block level.

```go
// The identifier followed by the `as` keyword is the prefix bound
// to this namespace name.
xmlns "http://example.com" as eg;

xml x = xml`<eg:doc>Hello</eg:doc>`;

xmlns "http://example.com" as ex;

// `b` will be `true`.
boolean b = (x === x.<ex:doc>);

// `exdoc` will be `{http://example.com}doc`.
string exdoc = ex:doc;
```

#### Output

```go
bal run xmlns_declarations.bal
```
# XML Namespaces

 The goal is to support namespaces without adding complexity if you don’t use them. The 
 `ns:x` qualified name in XML is expanded into `{url}x` where `url` is the namespace name bound to `ns`. The XML namespace
 declarations are kept as attributes using the standard binding of [xmlns](http:www.w3.org/2000/xmlns/).

```go
xml:Element e = xml`<p:e xmlns:p="http://example.com/"/>`;
// `name` will be `{http://example.com}e`.
string name = e.getName();
```

#### Output

```go
bal run xml_namespaces.bal
```
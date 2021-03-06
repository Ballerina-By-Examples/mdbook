# XSLT Transformation

 This example demonstrates how XML content can be transformed to HTML using a given XSL transformation.
 For more information on the underlying module,
 see the [XSLT module](https:docs.central.ballerina.io/ballerina/xslt/latest/).

```go
import ballerina/io;
import ballerina/xslt;

public function main() returns error? {
    // Gets an `XML` value, which needs to be transformed.
    xml sourceXml = getXml();
    // Gets an `XSL` style sheet represented in an XML value.
    xml xsl = getXsl();
    // [Transforms](https://docs.central.ballerina.io/ballerina/xslt/latest/functions#transform) the `XML` content to another format.
    xml target = check xslt:transform(sourceXml, xsl);
    
    io:println("Transformed XML: ", target);
}

// Returns an `XML` element, which needs to be transformed.
function getXml() returns xml {
    return xml `<samples>
                    <song>
                        <title>Summer of 69</title>
                        <artist>Bryan Adams</artist>
                        <country>Canada</country>
                        <year>1984</year>
                    </song>
                    <song>
                        <title>Zombie</title>
                        <artist>Bad Wolves</artist>
                        <country>USA</country>
                        <year>2018</year>
                    </song>
                </samples>`;
}

// Returns an `XSL` style sheet represented by an XML element.
function getXsl() returns xml {
    return xml
        `<xsl:stylesheet version="1.0" 
                         xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
            <xsl:template match="/">
                <html>
                    <body>
                        <h2>All time favourites</h2>
                        <table border="1">
                            <tr bgcolor="#9acd33">
                                <th>Title</th>
                                <th>Artist</th>
                            </tr>
                        <xsl:for-each select="samples/song">
                            <tr>
                                <td>
                                    <xsl:value-of select="title"/>
                                </td>
                                <td>
                                    <xsl:value-of select="artist"/>
                                </td>
                            </tr>
                        </xsl:for-each>
                        </table>
                    </body>
                </html>
            </xsl:template>
        </xsl:stylesheet>`;
}
```

#### Output

```go
bal run xslt_transformation.bal
Transformed XML: <html>
<body>
<h2>All time favourites</h2>
<table border="1">
<tr bgcolor="#9acd33">
<th>Title</th><th>Artist</th>
</tr>
<tr>
<td>Summer of 69</td><td>Bryan Adams</td>
</tr>
<tr>
<td>Zombie</td><td>Bad Wolves</td>
</tr>
</table>
</body>
</html>
```
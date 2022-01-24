# File Paths

 The Ballerina File API also contains utility functions to manipulate file paths in a way that is compatible with the
 target operating system.<br/><br/>
 For more information on the underlying module, 
 see the [File module](https:docs.central.ballerina.io/ballerina/file/latest/).

```go
import ballerina/file;
import ballerina/io;

public function main() returns error? {
    // Gets the absolute representation of the path.
    string absValue = check file:getAbsolutePath("test.txt");
    io:println("Absolute path: ", absValue);

    // Checks whether the path is absolute.
    boolean isAbs = check file:isAbsolutePath("/A/B/C");
    io:println("/A/B/C is absolute: ", isAbs);

    // Gets the base name of the path.
    string name = check file:basename("/A/B/C");
    io:println("Filename of /A/B/C: ", name);

    // Gets the enclosing parent directory.
    string parentPath = check file:parentPath("/A/B/C");
    io:println("Parent of /A/B/C: ", parentPath);

    // Gets the shortest path name equivalent to the path by purely lexical processing.
    string normalizedPath = check file:normalizePath("foo/../bar", file:CLEAN);
    io:println("Normalized path of foo/../bar: ", normalizedPath);

    // Gets the list of path elements joined by the OS-specific path separator.
    string[] parts = check file:splitPath("/A/B/C");
    io:println(string `Path elements of /A/B/C: ${parts.toString()}`);

    // Joins any number of path elements into a single path.
    string path = check file:joinPath("/", "foo", "bar");
    io:println("Built path of '/', 'foo', 'bar': ", path);

    // Returns a relative path that is logically equivalent to the target path when joined to the base path.
    string relPath = check file:relativePath("a/b/c", "a/c/d");
    io:println("Relative path between 'a/b/c' and 'a/c/d': ", relPath);
}
```

#### Output

```go
bal run filepaths.bal
On Unix:
Absolute path of test.txt: /A/test.txt
/A/B/C is absolute: true
Filename of /A/B/C: C
Parent of /A/B/C: /A/B
Normalized path of foo/../bar: bar
Path elements of /A/B/C: ["A","B","C"]
Built path of '/', 'foo', 'bar': /foo/bar
Relative path between 'a/b/c' and 'a/c/d': ../../c/d

On Windows:
Absolute path of test.txt: \A\test.txt
/A/B/C is absolute: false
Filename of /A/B/C: C
Parent of /A/B/C: \A\B
Normalized path of foo/../bar: bar
Path elements of /A/B/C: ["A","B","C"]
Built path of '/', 'foo', 'bar': \foo\bar
Relative path between 'a/b/c' and 'a/c/d': ..\..\c\d
```
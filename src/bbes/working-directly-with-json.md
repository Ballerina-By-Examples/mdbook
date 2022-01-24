# Working directly with JSON

 Ballerina defines certain types as lax types for which static typing rules are less strict.
 For example, field access (`.`) and optional field access (`?.`), which are generally allowed on
 records and objects for fields that are defined in the type descriptors, are also additionally
 allowed on lax types. For such operations, some of the type checking is moved from compile time to runtime.
 `json` is defined to be a lax type along with any `map<T>` where `T` is a lax type.

```go
import ballerina/io;
import ballerina/lang.value as value;

// Define a variable of type `json` that holds a mapping value.
json j = {
    x: {
        y: {
            z: "ballerina"
        }
    }
};

// Field access is allowed on the `json`-typed variable. However, the return
// type would be a union of `json` and `error`.
json v = check j.x.y;
string s1 = check v.z;

// `ensureType` method can also be used to perform conversions.
string s2 = check value:ensureType(v.z, string);

public function main() {
    io:println("Value of s1: " + s1);
    io:println("Value of s2: " + s2);
}
```

#### Output

```go
bal run working_directly_with_json.bal
Value of s1: ballerina
Value of s2: ballerina
```
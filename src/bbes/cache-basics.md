# Cache Basics

 The Ballerina Cache API provides an in-memory cache implementation by default with a
 `Least Recently Used` algorithm-based eviction policy.
 For more information on the underlying module,
 see the [Cache module](https:docs.central.ballerina.io/ballerina/cache/latest/).

```go
import ballerina/cache;
import ballerina/io;

public function main() returns error? {
    // This creates a new cache instance with the default configurations.
    cache:Cache cache = new();

    // Adds new entries to the cache.
    check cache.put("key1", "value1");
    check cache.put("key2", "value2");

    // Checks for the cached key availability.
    if (cache.hasKey("key1")) {
        // Fetches the cached value.
        string value = <string> check cache.get("key1");
        io:println("The value of the key1: " + value);
    }
    // Gets the keys of the cache entries.
    string[] keys = cache.keys();
    io:println("The existing keys in the cache: " + keys.toString());

    // Gets the size of the cache.
    int size = cache.size();
    io:println("The cache size: ", size);
}
```

#### Output

```go
bal run cache_basic.bal
The value of the key1: value1
The existing keys in the cache: ["key1","key2"]
The cache size: 2
```
# Documentation

 Annotations would be inconvenient for specifying structured documentation.
 Ballerina-flavored Markdown (BFM) is additional conventions on top of Markdown,
 which makes it more convenient for documenting Ballerina code.

```go
// Lines starting with `#` contain structured documentation in Markdown format.
# Adds two integers.
// Documenting parameters of the function
# + x - an integer
# + y - another integer
// Documenting return parameter of the function
# + return - the sum of `x` and `y`
public function add(int x, int y)
                     returns int {

  return x + y;
}
```

#### Output

```go
bal run documentation.bal
```
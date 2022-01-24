# Ordering

 Ordering works consistently with `<`, `<=`, `>`, `>=` operators. Some comparisons involving
 `()` and `float NaN` are considered `unordered`. `order by` clause allows `expressions` not just
 `field access`. A library module can enable Unicode-aware sorting by providing a
 `unicode:sortKey(str, locale)` function.

```go
import ballerina/io;

type Employee record {
    string firstName;
    string lastName;
    decimal salary;
};

public function main() {
    Employee[] employees = [
        {firstName: "Jones", lastName: "Welsh", salary: 1000.00},
        {firstName: "Anne", lastName: "Frank", salary: 5000.00}
    ];

    Employee[] sorted = from var e in employees
                        // The `order by` clause sorts the output items based on the
                        // given `order-key` and `order-direction`. The `order-key`
                        // must be an `ordered` type. The `order-direction` is `ascending`
                        // if not specified explicitly.
                        order by e.lastName ascending, e.firstName ascending


                        select e;
    io:println(sorted);
}
```

#### Output

```go
bal run ordering.bal
[{"firstName":"Anne","lastName":"Frank","salary":5000.00},{"firstName":"Jones","lastName":"Welsh","salary":1000.00}]
```
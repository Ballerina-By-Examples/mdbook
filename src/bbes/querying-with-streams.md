# Querying With Streams

 If stream terminates with `error`, result of `query expression` is an `error`. You cannot use `foreach`
 on `stream` type with termination type that allows `error`. Instead use `from` with `do` clause; the
 result is a subtype of `error?`. Use `stream` keyword in front of `from` to create a `stream` which is
 lazily evaluated. The failure of `check` within the `query` will cause the `stream` to produce an
 `error` termination value.

```go
import ballerina/io;

type Error error;

type LS stream<string, Error?>;

type ValueRecord record {|
    string value;
|};

const SAMPLE_LINE_COUNT = 5;

class LineGenerator {
    int i = -1;
    string inputString;

    public function init(string str) {
        self.inputString = str;
    }

    public isolated function next() returns ValueRecord|Error? {
        self.i += 1;
        if (self.i < SAMPLE_LINE_COUNT) {
            if (self.i % 2 == 0) {
                return {value: self.inputString};
            }
            return {value: ""};
        }
        return;
    }
}

// This method strips the blank lines.
function strip(LS lines) returns LS {
    // Creates a `stream` from the query expression.
    LS res = stream from var line in lines
             where line.trim().length() > 0
             select line;

    return res;
}

function count(LS lines) returns int|Error {
    int nLines = 0;
    // Counts the number of lines by iterating the `stream`
    // in `query action`.
    var _ = check from var _ in lines
              do {
                  nLines += 1;
              };

    return nLines;
}

public function main() {
    LineGenerator generator = new ("Everybody can dance");
    LS inputLineStream = new (generator);

    LS strippedStream = strip(inputLineStream);

    int|Error nonBlankCount = count(strippedStream);

    if (nonBlankCount is int) {
        io:println("Input line count:" + SAMPLE_LINE_COUNT.toString());
        io:println("Non blank line count:" + nonBlankCount.toString());
    }

}
```

#### Output

```go
bal run querying_with_streams.bal
Input line count:5
Non blank line count:3
```
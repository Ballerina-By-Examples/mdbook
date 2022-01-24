# Generate UUID

 The `uuid` library provides functions related to UUID(Universal Unique Identifier).<br/><br/>
 For more information on the underlying module,
 see the [UUID module](https:docs.central.ballerina.io/ballerina/uuid/latest/).

```go
import ballerina/io;
import ballerina/uuid;

public function main() returns error? {
    // Generates a UUID of type 1 as a string.
    string uuid1String = uuid:createType1AsString();
    io:println("UUID of type 1 as a string: ", uuid1String);

    // Generates a UUID of type 1 as a UUID record.
    uuid:Uuid uuid1Record = check uuid:createType1AsRecord();
    io:println("UUID of type 1 as a record: ", uuid1Record);

    // Generates a UUID of type 3 as a string.
    string uuid3String = check uuid:createType3AsString(
    uuid:NAME_SPACE_DNS, "ballerina.io");
    io:println("UUID of type 3 as a string: ", uuid3String);

    // Generates a UUID of type 3 as a record.
    uuid:Uuid uuid3Record = check uuid:createType3AsRecord(
    uuid:NAME_SPACE_DNS, "ballerina.io");
    io:println("UUID of type 3 as a record: ", uuid3Record);

    // Generates a UUID of type 4 as a string.
    string uuid4String = uuid:createType4AsString();
    io:println("UUID of type 4 as a string: ", uuid4String);

    // Generates a UUID of type 4 as a UUID record.
    uuid:Uuid uuid4Record = check uuid:createType4AsRecord();
    io:println("UUID of type 4 as a record: ", uuid4Record);

    // Generates a UUID of type 5 as a string.
    string uuid5String = check uuid:createType5AsString(
                                    uuid:NAME_SPACE_DNS, "ballerina.io");
    io:println("UUID of type 5 as a string: ", uuid5String);

    // Generates a UUID of type 5 as a record.
    uuid:Uuid uuid5Record = check uuid:createType5AsRecord(
                                       uuid:NAME_SPACE_DNS, "ballerina.io");
    io:println("UUID of type 5 as a record: ", uuid5Record);

    // Generates a nil UUID as a string.
    string nilUuidString = uuid:nilAsString();
    io:println("Nil UUID as a string: ", nilUuidString);

    // Generates a nil UUID as a UUID record.
    uuid:Uuid nilUuidRecord = uuid:nilAsRecord();
    io:println("Nil UUID as a record: ", nilUuidRecord);
}
```

#### Output

```go
bal run uuid_generation.bal
UUID of type 1 as a string: 01eb3f05-fbf8-1b92-8711-dc6a5719bb63
UUID of type 1 as a record: {"timeLow":32194310,"timeMid":7997,"timeHiAndVersion":5524,"clockSeqHiAndReserved":170,"clockSeqLo":116,"node":82490221220318}
UUID of type 3 as a string: cea5c405-7d11-3fbb-bdfb-9b68497be28b
UUID of type 3 as a record: {"timeLow":3466970117,"timeMid":32017,"timeHiAndVersion":16315,"clockSeqHiAndReserved":189,"clockSeqLo":251,"node":170872211759755}
UUID of type 4 as a string: 73e0d74e-8a4a-40ce-b1d9-b5b522533852
UUID of type 4 as a record: {"timeLow":2795821625,"timeMid":5327,"timeHiAndVersion":20251,"clockSeqHiAndReserved":161,"clockSeqLo":71,"node":59752348973988}
UUID of type 5 as a string: 08aab8bc-c69e-5ea8-8a52-dbb645c67fb5
UUID of type 5 as a record: {"timeLow":145406140,"timeMid":50846,"timeHiAndVersion":24232,"clockSeqHiAndReserved":138,"clockSeqLo":82,"node":241575901167541}
Nil UUID as a string: 00000000-0000-0000-0000-000000000000
Nil UUID as a record: {"timeLow":0,"timeMid":0,"timeHiAndVersion":0,"clockSeqHiAndReserved":0,"clockSeqLo":0,"node":0}
```
# Azure Functions

 Azure Functions is an event driven, serverless computing platform.
 Ballerina functions can be deployed in Azure Functions by annotating a Ballerina function with "@functions:Function".
 For more information, see the [Azure Deployment Guide](https:ballerina.io/learn/deployment/azure-functions/).

```go
import ballerina/uuid;
import ballerinax/azure_functions as af;

// HTTP request/response with no authentication
@af:Function
public function hello(@af:HTTPTrigger { authLevel: "anonymous" }
                      string payload)
                      returns @af:HTTPOutput string|error {
    return "Hello, " + payload + "!";
}

// HTTP request to add data to a queue
@af:Function
public function fromHttpToQueue(af:Context ctx, 
            @af:HTTPTrigger af:HTTPRequest req, 
            @af:QueueOutput { queueName: "queue1" } af:StringOutputBinding msg) 
            returns @af:HTTPOutput af:HTTPBinding {
    msg.value = req.body;
    return { statusCode: 200, payload: "Request: " + req.toString() };
}

// A message put to a queue is copied to another queue
@af:Function
public function fromQueueToQueue(af:Context ctx, 
        @af:QueueTrigger { queueName: "queue2" } string inMsg,
        @af:QueueOutput { queueName: "queue3" } af:StringOutputBinding outMsg) {
    ctx.log("In Message: " + inMsg);
    ctx.log("Metadata: " + ctx.metadata.toString());
    outMsg.value = inMsg;
}

// A blob added to a container is copied to a queue
@af:Function
public function fromBlobToQueue(af:Context ctx, 
        @af:BlobTrigger { path: "bpath1/{name}" } byte[] blobIn,
        @af:BindingName  string name,
        @af:QueueOutput { queueName: "queue3" } af:StringOutputBinding outMsg) 
        returns error? {
    outMsg.value = "Name: " + name + " Content: " + blobIn.toString();
}

// HTTP request to read a blob value
@af:Function
public function httpTriggerBlobInput(@af:HTTPTrigger af:HTTPRequest req, 
                    @af:BlobInput { path: "bpath1/{Query.name}" }
                    byte[]? blobIn)
                    returns @af:HTTPOutput string {
    int length = 0;
    if blobIn is byte[] {
        length = blobIn.length();
    }
    return "Blob: " + req.query["name"].toString() + " Length: " + 
            length.toString() + " Content: " + blobIn.toString();
}

// HTTP request to add a new blob
@af:Function
public function httpTriggerBlobOutput(@af:HTTPTrigger af:HTTPRequest req, 
        @af:BlobOutput { path: "bpath1/{Query.name}" }
            af:StringOutputBinding bb)
        returns @af:HTTPOutput string|error {
    bb.value = req.body;
    return "Blob: " + req.query["name"].toString() + " Content: " + 
            bb?.value.toString();
}

// HTTP request to add a new blob
@af:Function
public function httpTriggerBlobOutput2(@af:HTTPTrigger af:HTTPRequest req,
        @af:BlobOutput { path: "bpath1/{Query.name}" } af:BytesOutputBinding bb)
        returns @af:HTTPOutput string|error {
    bb.value = [65, 66, 67, 97, 98];
    return "Blob: " + req.query["name"].toString() + " Content: " +
            bb?.value.toString();
}

// Sending an SMS
@af:Function
public function sendSMS(@af:HTTPTrigger af:HTTPRequest req, 
                        @af:TwilioSmsOutput { fromNumber: "+12069845840" } 
                                              af:TwilioSmsOutputBinding tb)
                        returns @af:HTTPOutput string {
    tb.to = req.query["to"].toString();
    tb.body = req.body.toString();
    return "Message - to: " + tb?.to.toString() + " body: " +
            tb?.body.toString();
}

public type Person record {
    string id;
    string name;
    string country;
};

// CosmosDB record trigger
@af:Function
public function cosmosDBToQueue1(@af:CosmosDBTrigger { 
        connectionStringSetting: "CosmosDBConnection", databaseName: "db1",
        collectionName: "c1" } Person[] req, 
        @af:QueueOutput { queueName: "queue3" } af:StringOutputBinding outMsg) {
    outMsg.value = req.toString();
}

@af:Function
public function cosmosDBToQueue2(@af:CosmosDBTrigger { 
        connectionStringSetting: "CosmosDBConnection", databaseName: "db1", 
        collectionName: "c2" } json req,
        @af:QueueOutput { queueName: "queue3" } af:StringOutputBinding outMsg) {
    outMsg.value = req.toString();
}

// HTTP request to read CosmosDB records
@af:Function
public function httpTriggerCosmosDBInput1(
            @af:HTTPTrigger af:HTTPRequest httpReq, 
            @af:CosmosDBInput { connectionStringSetting: "CosmosDBConnection", 
                databaseName: "db1", collectionName: "c1", 
                id: "{Query.id}", partitionKey: "{Query.country}" } json dbReq)
                returns @af:HTTPOutput string|error {
    return dbReq.toString();
}

@af:Function
public function httpTriggerCosmosDBInput2(
            @af:HTTPTrigger af:HTTPRequest httpReq, 
            @af:CosmosDBInput { connectionStringSetting: "CosmosDBConnection", 
                databaseName: "db1", collectionName: "c1", 
                id: "{Query.id}", partitionKey: "{Query.country}" }
                      Person? dbReq)
                returns @af:HTTPOutput string|error {
    return dbReq.toString();
}

@af:Function
public function httpTriggerCosmosDBInput3(
        @af:HTTPTrigger { route: "c1/{country}" } af:HTTPRequest httpReq, 
        @af:CosmosDBInput { connectionStringSetting: "CosmosDBConnection", 
        databaseName: "db1", collectionName: "c1", 
        sqlQuery: "select * from c1 where c1.country = {country}" } 
        Person[] dbReq)
        returns @af:HTTPOutput string|error {
    return dbReq.toString();
}

// HTTP request to write records to CosmosDB
@af:Function
public function httpTriggerCosmosDBOutput1(
    @af:HTTPTrigger af:HTTPRequest httpReq, @af:HTTPOutput af:HTTPBinding hb) 
    returns @af:CosmosDBOutput { connectionStringSetting: "CosmosDBConnection", 
                                 databaseName: "db1", collectionName: "c1" }
                                 json {
    json entry = { id: uuid:createType1AsString(), name: "Saman",
                    country: "Sri Lanka" };
    hb.payload = "Adding entry: " + entry.toString();
    return entry;
}

@af:Function
public function httpTriggerCosmosDBOutput2(
        @af:HTTPTrigger af:HTTPRequest httpReq, 
        @af:HTTPOutput af:HTTPBinding hb) 
        returns @af:CosmosDBOutput { 
            connectionStringSetting: "CosmosDBConnection", 
            databaseName: "db1", collectionName: "c1" } json {
    json entry = [{ id: uuid:createType1AsString(),
                    name: "John Doe A", country: "USA" },
                  { id: uuid:createType1AsString(),
                    name: "John Doe B", country: "USA" }];
    hb.payload = "Adding entries: " + entry.toString();
    return entry;
}

@af:Function
public function httpTriggerCosmosDBOutput3(
                    @af:HTTPTrigger af:HTTPRequest httpReq) 
                    returns @af:CosmosDBOutput { 
                        connectionStringSetting: "CosmosDBConnection", 
                        databaseName: "db1", collectionName: "c1" } Person[] {
    Person[] persons = [];
    persons.push({id: uuid:createType1AsString(), name: "Jack", country: "UK"});
    persons.push({id: uuid:createType1AsString(), name: "Will", country: "UK"});
    return persons;
}

// A timer function which is executed every 10 seconds.
@af:Function
public function queuePopulationTimer(
            @af:TimerTrigger { schedule: "*/10 * * * * *" } json triggerInfo, 
            @af:QueueOutput { queueName: "queue4" }
             af:StringOutputBinding msg) {msg.value = triggerInfo.toString();
}
```

#### Output

```go
# Prerequisites: Azure CLI tools installation and configuration

# Build the Ballerina program to generate the Azure Functions
bal build azure_functions_deployment.bal
Compiling source
	azure_functions_deployment.bal

Generating executables
	azure_functions_deployment.jar
	@azure_functions:Function: hello, fromHttpToQueue, fromQueueToQueue, fromBlobToQueue, httpTriggerBlobInput, httpTriggerBlobOutput, sendSMS, cosmosDBToQueue1, cosmosDBToQueue2, httpTriggerCosmosDBInput1, httpTriggerCosmosDBInput2, httpTriggerCosmosDBInput3, httpTriggerCosmosDBOutput1, httpTriggerCosmosDBOutput2, httpTriggerCosmosDBOutput3, queuePopulationTimer

	Run the following command to deploy Ballerina Azure Functions:
	az functionapp deployment source config-zip -g <resource_group> -n <function_app_name> --src azure-functions.zip

# Execute the following Azure CLI command to publish the functions (replace with your respective Azure <resource_group> and <function_app_name>)
az functionapp deployment source config-zip -g functions1777 -n functions1777 --src  azure-functions.zip 
Getting scm site credentials for zip deployment
Starting zip deployment. This operation can take a while to complete ...
Deployment endpoint responded with status code 202
{
  "active": true,
  "author": "N/A",
  "author_email": "N/A",
  "complete": true,
  "deployer": "ZipDeploy",
  "end_time": "2020-07-02T06:48:08.7706207Z",
  "id": "2bacf185fb114d42aab762dfd5f303dc",
  "is_readonly": true,
  "is_temp": false,
  "last_success_end_time": "2020-07-02T06:48:08.7706207Z",
  "log_url": "https://functions1777.scm.azurewebsites.net/api/deployments/latest/log",
  "message": "Created via a push deployment",
  "progress": "",
  "provisioningState": null,
  "received_time": "2020-07-02T06:47:56.2756472Z",
  "site_name": "functions1777",
  "start_time": "2020-07-02T06:47:56.7600364Z",
  "status": 4,
  "status_text": "",
  "url": "https://functions1777.scm.azurewebsites.net/api/deployments/latest"
}

# Invoke the functions (replace with your <auth_code> value in authenticated requests)
curl -d "Jack" https://functions1777.azurewebsites.net/api/hello
Hello, Jack!

curl -d "ABCDE" https://functions1777.azurewebsites.net/api/fromHttpToQueue?code=<auth_code>
Request: url=https://functions1777.azurewebsites.net/api/fromHttpToQueue... body=ABCDE

curl "https://functions1777.azurewebsites.net/api/httpTriggerBlobInput?name=input.txt&code=<auth_code>"
Blob: input.txt Length: 6 Content: 65 66 67 68 69 10

curl -d "123456" "https://functions1777.azurewebsites.net/api/httpTriggerBlobOutput?name=payload.txt&code=<auth_code>"
Blob: payload.txt Content: 123456

curl -d "123456" "https://functions1777.azurewebsites.net/api/httpTriggerBlobOutput2?name=payload.txt&code=<auth_code>"
Blob: payload.txt Content: 65 66 67 97 98

curl -d "Hello!" "https://functions1777.azurewebsites.net/api/sendSMS?to=xxxxxxxxxx&code=<auth_code>"
Message - to: xxxxxxxxxx body: Hello!

curl "https://functions1777.azurewebsites.net/api/httpTriggerCosmosDBInput1?id=id1&code=<auth_code>"
id=id1 _rid=zEkwANYTRPoFAAAAAAAAAA== _self=dbs/zEkwAA==/colls/zEkwANYTRPo=/docs/zEkwANYTRPoFAAAAAAAAAA==/ _ts=1591201470 _etag="10009f6c-0000-0100-0000-5ed7cebe0000" name=Tom birthYear=1950 country=Sri Lanka pk=p1

curl "https://functions1777.azurewebsites.net/api/httpTriggerCosmosDBInput2?id=id1&code=<auth_code>"
id=id1 name=Tom birthYear=1950 _rid=zEkwANYTRPoFAAAAAAAAAA== _self=dbs/zEkwAA==/colls/zEkwANYTRPo=/docs/zEkwANYTRPoFAAAAAAAAAA==/ _ts=1591201470 _etag="10009f6c-0000-0100-0000-5ed7cebe0000" country=Sri Lanka pk=p1

curl "https://functions1777.azurewebsites.net/api/c1/Sri%20Lanka?code=<auth_code>"
id=id3 name=Jack X birthYear=1950 country=Sri Lanka pk=p1 _rid=zEkwANYTRPoEAAAAAAAAAA== _self=dbs/zEkwAA==/colls/zEkwANYTRPo=/docs/zEkwANYTRPoEAAAAAAAAAA==/ _etag="1000076b-0000-0100-0000-5ed7cc110000" _attachments=attachments/ _ts=1591200785 id=id4 name=Tom birthYear=1950 country=Sri Lanka pk=p1 _rid=zEkwANYTRPoFAAAAAAAAAA== _self=dbs/zEkwAA==/colls/zEkwANYTRPo=/docs/zEkwANYTRPoFAAAAAAAAAA==/ _etag="10009f6c-0000-0100-0000-5ed7cebe0000" _attachments=attachments/ _ts=1591201470

curl https://functions1777.azurewebsites.net/api/httpTriggerCosmosDBOutput1?code=<auth_code>
Adding entry: id=abf42517-53d7-4fa3-a30c-87cb65e9597d name=John Doe birthYear=1980

curl https://functions1777.azurewebsites.net/api/httpTriggerCosmosDBOutput2?code=<auth_code>
Adding entries: id=f510e0d2-5341-4901-8c12-9aac1b212378 name=John Doe A birthYear=1985 id=cc145a0f-cb4f-4a5f-8d0f-fbf01209aa2d name=John Doe B birthYear=1990

curl https://functions1777.azurewebsites.net/api/httpTriggerCosmosDBOutput3?code=<auth_code>
[{"id":"4ba53cb4-47a1-4028-af7b-2515f0a9c6bf","name":"Jack","birthYear":2001},{"id":"5b8a6697-c9e9-488d-91b3-3942574efeef","name":"Will","birthYear":2005}]


```
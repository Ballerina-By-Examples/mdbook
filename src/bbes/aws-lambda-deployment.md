# AWS Lambda

 AWS Lambda is an event driven, serverless computing platform.
 Ballerina functions can be deployed in AWS Lambda by annotating
 a Ballerina function with "@awslambda:Function", which should have
 the function signature `function (awslambda:Context, json|EventType) returns json|error`.<br/><br/>
 For more information, see the [AWS Lambda Deployment Guide](https:ballerina.io/learn/deployment/aws-lambda/).

```go
import ballerinax/awslambda;
import ballerina/uuid;
import ballerina/io;

// The `@awslambda:Function` annotation marks a function to
// generate an AWS Lambda function
@awslambda:Function
public function echo(awslambda:Context ctx, json input) returns json {
   return input;
}

@awslambda:Function
public function uuid(awslambda:Context ctx, json input) returns json {
   return uuid:createType1AsString();
}

// The `awslambda:Context` object contains request execution
// context information
@awslambda:Function
public function ctxinfo(awslambda:Context ctx, json input) returns json|error {
   json result = { RequestID: ctx.getRequestId(),
                   DeadlineMS: ctx.getDeadlineMs(),
                   InvokedFunctionArn: ctx.getInvokedFunctionArn(),
                   TraceID: ctx.getTraceId(),
                   RemainingExecTime: ctx.getRemainingExecutionTime() };
   return result;
}

@awslambda:Function
public function notifySQS(awslambda:Context ctx, 
                          awslambda:SQSEvent event) returns json {
    return event.Records[0].body;
}

@awslambda:Function
public function notifyS3(awslambda:Context ctx, 
                         awslambda:S3Event event) returns json {
    return event.Records[0].s3.'object.key;
}

@awslambda:Function
public function notifyDynamoDB(awslambda:Context ctx, 
                               awslambda:DynamoDBEvent event) returns json {
    return event.Records[0].dynamodb.Keys.toString();
}

@awslambda:Function
public function notifySES(awslambda:Context ctx, 
                          awslambda:SESEvent event) returns json {
    return event.Records[0].ses.mail.commonHeaders.subject;
}

@awslambda:Function
public function apigwRequest(awslambda:Context ctx, 
                             awslambda:APIGatewayProxyRequest request) {
    io:println("Path: ", request.path);
}
```

#### Output

```go
# Prerequisites: AWS CLI tools installation and configuration

# Build the Ballerina program to generate the AWS Lambda functions
$ bal build functions.bal
Compiling source
	functions.bal

Generating executables
	functions.jar
	@awslambda:Function: echo, uuid, ctxinfo, notifySQS, notifyS3

	Run the following command to deploy each Ballerina AWS Lambda function:
	aws lambda create-function --function-name $FUNCTION_NAME --zip-file fileb://aws-ballerina-lambda-functions.zip --handler functions.$FUNCTION_NAME --runtime provided --role $LAMBDA_ROLE_ARN --layers arn:aws:lambda:$REGION_ID:134633749276:layer:ballerina-jre11:6 --memory-size 512 --timeout 10

	Run the following command to re-deploy an updated Ballerina AWS Lambda function:
	aws lambda update-function-code --function-name $FUNCTION_NAME --zip-file fileb://aws-ballerina-lambda-functions.zip

# Execute the AWS CLI commands to create and publish the functions; and set your respective AWS $LAMBDA_ROLE_ARN, $REGION_ID, and $FUNCTION_NAME values; following are some examples:-
$ aws lambda create-function --function-name echo --zip-file fileb://aws-ballerina-lambda-functions.zip --handler aws_lambda_deployment.echo --runtime provided --role arn:aws:iam::908363916111:role/lambda-role
 --layers arn:aws:lambda:us-west-1:134633749276:layer:ballerina-jre11:6 --memory-size 512 --timeout 10
$ aws lambda create-function --function-name uuid --zip-file fileb://aws-ballerina-lambda-functions.zip --handler aws_lambda_deployment.uuid --runtime provided --role arn:aws:iam::908363916111:role/lambda-role
 --layers arn:aws:lambda:us-west-1:134633749276:layer:ballerina-jre11:6 --memory-size 512 --timeout 10
$ aws lambda create-function --function-name ctxinfo --zip-file fileb://aws-ballerina-lambda-functions.zip --handler aws_lambda_deployment.ctxinfo --runtime provided --role arn:aws:iam::908363916111:role/lambda-role
 --layers arn:aws:lambda:us-west-1:134633749276:layer:ballerina-jre11:6 --memory-size 512 --timeout 10


# Invoke the functions
$ echo '{"MESSAGE":"HELLO"}' > input.json
$ aws lambda invoke --function-name echo --payload fileb://input.json echo-response.txt
{
    "ExecutedVersion": "$LATEST", 
    "StatusCode": 200
}
$ cat echo-response.txt 
{"MESSAGE":"HELLO"}

$ aws lambda invoke --function-name uuid uuid-response.txt
{
    "ExecutedVersion": "$LATEST", 
    "StatusCode": 200
}
$ cat uuid-response.txt 
"711cd328-1937-40cc-9078-c3628c6edb02"

$ aws lambda invoke --function-name ctxinfo ctxinfo-response.txt
{
    "ExecutedVersion": "$LATEST", 
    "StatusCode": 200
}
$ cat ctxinfo-response.txt 
{"RequestID":"d55f7d06-f2ab-4b6e-8606-482607785a91", "DeadlineMS":1548069389978, "InvokedFunctionArn":"arn:aws:lambda:us-west-2:908363916138:function:ctxinfo", "TraceID":"Root=1-5c45aa03-f8aff4c9e24dc4fbf48f2990;Parent=17ad3b290def98fd;Sampled=0", "RemainingExecTime":9946}
```
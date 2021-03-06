# Websub Subscriber Service

 Ballerina provides the capability to easily introduce subscriber services that are WebSub-compliant.
 Ballerina WebSub subscribers can specify the topic and hub to which they wish to subscribe to receive notifications. 
 If not specified WebSub Subscriber Services will auto generate a unique random service path segment. 
 Ballerina WebSub Subscriber Services could thus be registered as WebHooks to receive event notifications.
 In this example, a WebSub Subscriber service is used to implement a GitHub-based WebHook service.<br/><br/>
 For more information on the underlying module, 
 see the [WebSub module](https:docs.central.ballerina.io/ballerina/websub/latest/).

```go
// The Ballerina WebSub Subscriber service, which could be used as a WebHook Listener for GitHub.
import ballerina/websub;
import ballerina/io;

// Annotation-based configurations specifying the subscription parameters.
@websub:SubscriberServiceConfig {
    target: [
        "https://api.github.com/hub", 
        "https://github.com/<YOUR_ORGANIZATION>/<REPOSITORY>/events/push.json"
    ],
    secret: "<YOUR_SECRET_KEY>",
    httpConfig: {
        auth: {
            token: "<YOUR_AUTH_TOKEN>"
        }
    }
}
// Service path is not specified, hence Subscriber Service will auto generate a unique random service path segment.
service on new websub:Listener(9090) {
    // Defines the remote function that accepts the event notification request for the WebHook.
    remote function onEventNotification(
                    websub:ContentDistributionMessage event) returns error? {
        var retrievedContent = event.content;
        if (retrievedContent is json) {
            if (retrievedContent.zen is string) {
                int hookId = check retrievedContent.hook_id;
                json sender = check retrievedContent.sender;
                int senderId = check sender.id;
                io:println(string`PingEvent received for webhook [${hookId}]`);
                io:println(string`Event sender [${senderId}]`);
            } else if (retrievedContent.ref is string) {
                json repository = check retrievedContent.repository;
                string repositoryName =  check repository.name;
                string lastUpdatedTime =  check repository.updated_at;
                io:println(string`PushEvent received for [${repositoryName}]`);
                io:println(string`Last updated at ${lastUpdatedTime}`);
            }
        } else {
            io:println("Unrecognized content type, hence ignoring");
        }
    }
}
```

#### Output

```go
bal run websub_webhook_sample.bal
time = 2021-03-15 15:43:00,198 level = WARN module = ballerina/websub message = "HTTPS is recommended but using HTTP"
PingEvent received for webhook [287075824]
Event sender [77491511]
PushEvent received for [Hello-World]
Last updated at 2021-03-15T15:43:01Z
```
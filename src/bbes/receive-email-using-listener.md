# Receive Emails Using a Listener

 The email listener is used to receive (with POP3 or IMAP4) emails
 using the SSL or STARTTLS protocols. This sample includes receiving
 emails from a listener with default configurations over SSL using
 the default ports.<br/><br/>
 For more information on the underlying module, 
 see the [Email module](https:docs.central.ballerina.io/ballerina/email/latest/).

```go
import ballerina/email;
import ballerina/io;

// Creates the listener with the connection parameters and the protocol-related
// configuration. The polling interval specifies the time duration between each
// poll performed by the listener in seconds.
listener email:PopListener emailListener = check new ({
    host: "pop.email.com",
    username: "reader@email.com",
    password: "pass456",
    pollingInterval: 2,
    port: 995
});

// One or many services can listen to the email listener for the
// periodically-polled emails.
service "emailObserver" on emailListener {

    // When an email is successfully received, the `onMessage` method is
    // called.
    remote function onMessage(email:Message emailMessage) {
        io:println("POP Listener received an email.");
        io:println("Email Subject: ", emailMessage.subject);
        io:println("Email Body: ", emailMessage?.body);
    }

    // When an error occurs during the email poll operations, the `onError`
    // method is called.
    remote function onError(email:Error emailError) {
        io:println("Error while polling for the emails: "
            + emailError.message());
    }

    // When the listener is closed, the `onClose` method is called.
    remote function onClose(email:Error? closeError) {
        io:println("Closed the listener.");
    }

}
```

#### Output

```go
bal run receive_email_using_listener.bal

# Subject and the content body of the listened emails will be printed for each
# of the polled emails.
```
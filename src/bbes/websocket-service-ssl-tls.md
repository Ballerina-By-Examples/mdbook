# Service - SSL/TLS

 You can use the WebSocket listener to connect to or interact with an WebSocket client.
 Provide the `websocket:ListenerSecureSocket` configurations to the server to
 expose an WSS connection.<br/><br/>
 For more information on the underlying module, 
 see the [WebSocket module](https:docs.central.ballerina.io/ballerina/websocket/latest/).

```go
import ballerina/websocket;

// A WebSocket listener can be configured to communicate through WSS as well.
// To secure a listener using SSL/TLS, the listener needs to be configured with
// a certificate file and a private key file for the listener.
// The [`websocket:ListenerSecureSocket`](https://docs.central.ballerina.io/ballerina/websocket/latest/records/ListenerSecureSocket) record
// provides the SSL-related listener configurations of the listener.
listener websocket:Listener securedEP = new(9090,
    secureSocket = {
        key: {
            certFile: "../resource/path/to/public.crt",
            keyFile: "../resource/path/to/private.key"
        }
    }
);

service /foo on securedEP {
    resource isolated function get bar() returns websocket:Service {
        return new WsService();
   }
}

service class WsService {
    *websocket:Service;
    remote isolated function onTextMessage(websocket:Caller caller,
                             string text) returns websocket:Error? {
        check caller->writeTextMessage(text);
    }
}
```

#### Output

```go
# You may need to change the certificate file path and private key file path.
bal run websocket_service_ssl_tls.bal
```
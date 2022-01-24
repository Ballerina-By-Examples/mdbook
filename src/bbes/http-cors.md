# CORS

 This sample demonstrates the Ballerina server connector CORS configuration.
 CORS headers can be applied in both the service-level and the resource-level. Service-level CORS headers apply to all the resources
 unless there are headers configured at the resource-level. Ballerina CORS supports both simple and pre-flight requests.<br/><br/>
 For more information on the underlying module, 
 see the [HTTP module](https:docs.central.ballerina.io/ballerina/http/latest/).

```go
import ballerina/http;

// Service-level [CORS config](https://docs.central.ballerina.io/ballerina/http/latest/records/CorsConfig) applies
// globally to each `resource`.
@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://www.m3.com", "http://www.hello.com"],
        allowCredentials: false,
        allowHeaders: ["CORELATION_ID"],
        exposeHeaders: ["X-CUSTOM-HEADER"],
        maxAge: 84900
    }
}
service /crossOriginService on new http:Listener(9092) {

    // Resource-level [CORS config](https://docs.central.ballerina.io/ballerina/http/latest/records/CorsConfig)
    // overrides the service-level CORS headers.
    @http:ResourceConfig {
        cors: {
            allowOrigins: ["http://www.bbc.com"],
            allowCredentials: true,
            allowHeaders: ["X-Content-Type-Options", "X-PINGOTHER"]
        }
    }
    resource function get company() returns json {
        return {"type": "middleware"};
    }

    // Since there are no resource-level CORS configs defined here, the global
    // service-level CORS configs will be applied to this resource.
    resource function post lang() returns json {
        return {"lang": "Ballerina"};
    }
}
```

#### Output

```go
bal run http_cors.bal
```
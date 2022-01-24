# JWT Issue/Validate

 This example demonstrates how to issue a self-signed JWT and
 validate a JWT.<br/><br/>
 For more information on the underlying module,
 see the [JWT module](https:docs.central.ballerina.io/ballerina/jwt/latest/).

```go
import ballerina/io;
import ballerina/jwt;

public function main() returns error? {
    // Defines the JWT issuer configurations with the private key file configurations, which are used to self-sign the JWT.
    jwt:IssuerConfig issuerConfig = {
        username: "ballerina",
        issuer: "wso2",
        audience: "vEwzbcasJVQm1jVYHUHCjhxZ4tYa",
        keyId: "NTAxZmMxNDMyZDg3MTU1ZGM0MzEzODJhZWI4NDNlZDU1OGFkNjFiMQ",
        expTime: 3600,
        // Signature can be created using either the private key configurations or keystore configurations.
        // [jwt:IssuerSignatureConfig](https://docs.central.ballerina.io/ballerina/jwt/latest/records/IssuerSignatureConfig)
        signatureConfig: {
            config: {
                keyFile: "../resource/path/to/private.key"
            }
        }
    };

    // Issues a JWT based on the provided header, payload, and private key.
    string jwt = check jwt:issue(issuerConfig);
    io:println("Issued JWT: ", jwt);

    // Defines the JWT validator configurations with the public certificate file configurations, which are used to
    // validate the signature of JWT.
    jwt:ValidatorConfig validatorConfig = {
        issuer: "wso2",
        audience: "vEwzbcasJVQm1jVYHUHCjhxZ4tYa",
        clockSkew: 60,
        // Signature can be validated using the public certificate file, truststore configurations, or JWKS configurations.
        // [jwt:ValidatorSignatureConfig](https://docs.central.ballerina.io/ballerina/jwt/latest/records/ValidatorSignatureConfig)
        signatureConfig: {
            certFile: "../resource/path/to/public.crt"
        }
    };

    // Validates the created JWT.
    jwt:Payload payload = check jwt:validate(jwt, validatorConfig);
    io:println("Validated JWT Payload: ", payload.toString());
}
```

#### Output

```go
# You may need to change the certificate file path, private key file path, and
# trusted certificate file path.
bal run security_jwt_issue_validate.bal
Issued JWT: eyJhbGciOiJSUzI1NiIsICJ0eXAiOiJKV1QiLCAia2lkIjoiTlRBeFptTXhORE15WkR
            nM01UVTFaR00wTXpFek9ESmhaV0k0TkRObFpEVTFPR0ZrTmpGaU1RIn0.eyJpc3MiOi
            JiYWxsZXJpbmEiLCAic3ViIjoiYWRtaW4iLCAiYXVkIjoidkV3emJjYXNKVlFtMWpWW
            UhVSENqaHhaNHRZYSIsICJqdGkiOiI1NWEwYjc1NC04OTVmLTQyNzktODg0My1iNzQ1
            ZTExYTU3ZTkiLCAiZXhwIjoxNjExMTI3MDIzLCAibmJmIjoxNjExMTIzNDIzLCAiaWF
            0IjoxNjExMTIzNDIzfQ.DMJDjJEFiQN7d_2CXGfXX_UR8Fi7Witr3aVGm4K7amEm3xN
            cbh1bZmKO2ir-oP2_ikoM1_ETO7i4E4LKJHNAEdhqj8YHyKpbszaEq5zouMOtdFcI7i
            TS8LyYDnyLEQQ6sa9L9NoMz3xULeF8epk0eaN1vVA-ijndVkZlMjaXJNf9Bgzn2qJOd
            sQ6F0GeC4WKEt-xcEY5C2_haEDotSOYhUzEqh6D1fRtrGy7GaH5gzx99n-xjn8NZbTD
            F0VnD6c1kJPe25FiPz24l9KdaCE1i2WbuzEhZWMclHW5RcTXVkLLkjQ4DvxfE-riGmK
            qPN1gatWViZQF_VGBK-G7rEhi9Q
Validated JWT Payload: {"iss":"ballerina","sub":"admin",
                        "aud":"vEwzbcasJVQm1jVYHUHCjhxZ4tYa",
                        "jti":"55a0b754-895f-4279-8843-b745e11a57e9",
                        "exp":1611127023,"nbf":1611123423,"iat":1611123423}
```
import Debug "mo:base/Debug";
import Blob "mo:base/Blob";
import Cycles "mo:base/ExperimentalCycles";
import Array "mo:base/Array";
import Nat8 "mo:base/Nat8";
import Text "mo:base/Text";

//import the custom types we have in Types.mo
import Types "Types";

actor {

//PULIC METHOD
//This method sends a POST request to a URL with a free API we can test.
public func send_http_post_request() : async (Text,Nat) {

    //1. DECLARE IC MANAGEMENT CANISTER
    //We need this so we can use it to make the HTTP request
    let ic : Types.IC = actor ("aaaaa-aa");

    //2. SETUP ARGUMENTS FOR HTTP GET request

    // 2.1 Setup the URL and its query parameters
    //This URL is used because it allows us to inspect the HTTP request sent from the canister

let key = "AAAAgEy3QBw:APA91bEHp0aJ0OnC4YXfXgxPi2jmefXrqnYPGOpwsOEY27ARkztGycfUEnCs0GDcQ-qAXk5govzPLXUJluAtCwIZ-StTQDT8tGdaFAw7s3cuuy4IFBsCtXtekaYWzv9YzOsyLS6X2mFb";
let to = "e8rTAvdFRm0wnYtDABGXqr:APA91bFBTLy8hhkD3XnfQMxlETgdrzdHGCKY9RV4Lxiwog7rRk1P_hX9-4oZQLxUbCbF6ab92p6H606vA2plVN7HVmLOOoul8hxDL3c85Ef_9b6T3-22NcEqglPfoFYK3Lcds7-kl2Wx";
let url = "https://ic-netlify-functions.netlify.app/.netlify/functions/sendEmployeeEmail";

//create an idempotency key so as to help avoid duplicate requests being worked on by the concensus.

    //idempotency keys should be unique so we create a function that generates them.
    let idempotency_key: Text = generateUUID();
    let request_headers = [
        { name= "Content-Type"; value = "application/json" },
        { name= "Idempotency-Key"; value = idempotency_key }

    ];

    // The request body is an array of [Nat8] (see Types.mo) so we do the following:
    // 1. Write a JSON string
    // 2. Convert ?Text optional into a Blob, which is an intermediate reprepresentation before we cast it as an array of [Nat8]
    // 3. Convert the Blob into an array [Nat8]
    let request_body_json: Text = "{ \"job_name\" : \"Software Engineer\", \"to_name\" : \"Paul\",\"employee_email\" : \"peacevian66@gmail.com\" }";
    let request_body_as_Blob: Blob = Text.encodeUtf8(request_body_json);
    let request_body_as_nat8: [Nat8] = Blob.toArray(request_body_as_Blob); // e.g [34, 34,12, 0]


    // 2.3 The HTTP request
    let http_request : Types.HttpRequestArgs = {
        url = url;
        max_response_bytes = null; //optional for request
        headers = request_headers;
        //note: type of `body` is ?[Nat8] so we pass it here as "?request_body_as_nat8" instead of "request_body_as_nat8"
        body = ?request_body_as_nat8;
        method = #post;
        transform = null; //optional for request
    };

    //3. ADD CYCLES TO PAY FOR HTTP REQUEST

    //IC management canister will make the HTTP request so it needs cycles
    //See: https://internetcomputer.org/docs/current/motoko/main/cycles

    //The way Cycles.add() works is that it adds those cycles to the next asynchronous call
    //See: https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-http_request
    Cycles.add(220_131_200_000); //minimum cycles needed to pass the CI tests. Cycles needed will vary on many things size of http response, subnetc, etc...).

    //4. MAKE HTTPS REQUEST AND WAIT FOR RESPONSE
    //Since the cycles were added above, we can just call the IC management canister with HTTPS outcalls below
    let http_response : Types.HttpResponsePayload = await ic.http_request(http_request);

    //5. DECODE THE RESPONSE

    //As per the type declarations in `Types.mo`, the BODY in the HTTP response
    //comes back as [Nat8s] (e.g. [2, 5, 12, 11, 23]). Type signature:

    //public type HttpResponsePayload = {
    //     status : Nat;
    //     headers : [HttpHeader];
    //     body : [Nat8];
    // };

    //We need to decode that [Na8] array that is the body into readable text.
    //To do this, we:
    //  1. Convert the [Nat8] into a Blob
    //  2. Use Blob.decodeUtf8() method to convert the Blob to a ?Text optional
    //  3. We use Motoko syntax "Let... else" to unwrap what is returned from Text.decodeUtf8()
    let response_body: Blob = Blob.fromArray(http_response.body);
        let decoded_text: Text = switch (Text.decodeUtf8(response_body)) {
        case (null) { "No value returned" };
        case (?y) { y };
    };

    return (decoded_text , http_response.status);

};

//PRIVATE HELPER FUNCTION
//Helper method that generates a Universally Unique Identifier
//this method is used for the Idempotency Key used in the request headers of the POST request.
//For the purposes of this exercise, it returns a constant, but in practice it should return unique identifiers
func generateUUID() : Text {
"UUID-123456789";
};

public func send_employer_http_post_request() : async (Text,Nat) {

    //1. DECLARE IC MANAGEMENT CANISTER
    //We need this so we can use it to make the HTTP request
    let ic : Types.IC = actor ("aaaaa-aa");

    //2. SETUP ARGUMENTS FOR HTTP GET request

    // 2.1 Setup the URL and its query parameters
    //This URL is used because it allows us to inspect the HTTP request sent from the canister

let key = "AAAAgEy3QBw:APA91bEHp0aJ0OnC4YXfXgxPi2jmefXrqnYPGOpwsOEY27ARkztGycfUEnCs0GDcQ-qAXk5govzPLXUJluAtCwIZ-StTQDT8tGdaFAw7s3cuuy4IFBsCtXtekaYWzv9YzOsyLS6X2mFb";
let to = "e8rTAvdFRm0wnYtDABGXqr:APA91bFBTLy8hhkD3XnfQMxlETgdrzdHGCKY9RV4Lxiwog7rRk1P_hX9-4oZQLxUbCbF6ab92p6H606vA2plVN7HVmLOOoul8hxDL3c85Ef_9b6T3-22NcEqglPfoFYK3Lcds7-kl2Wx";
let url = "https://ic-netlify-functions.netlify.app/.netlify/functions/sendEmployerEMail";

//create an idempotency key so as to help avoid duplicate requests being worked on by the concensus.

    //idempotency keys should be unique so we create a function that generates them.
    let idempotency_key: Text = generateUUID2();
    let request_headers = [
        { name= "Content-Type"; value = "application/json" },
        { name= "Idempotency-Key"; value = idempotency_key }

    ];

    // The request body is an array of [Nat8] (see Types.mo) so we do the following:
    // 1. Write a JSON string
    // 2. Convert ?Text optional into a Blob, which is an intermediate reprepresentation before we cast it as an array of [Nat8]
    // 3. Convert the Blob into an array [Nat8]
    let request_body_json: Text = "{ \"job_name\" : \"Software Engineer\", \"employer_email\" : \"peacevian66@gmail.com\",\"applicant_link\" : \"https://samthetutor.hashnode.dev\" }";
    let request_body_as_Blob: Blob = Text.encodeUtf8(request_body_json);
    let request_body_as_nat8: [Nat8] = Blob.toArray(request_body_as_Blob); // e.g [34, 34,12, 0]


    // 2.3 The HTTP request
    let http_request : Types.HttpRequestArgs = {
        url = url;
        max_response_bytes = null; //optional for request
        headers = request_headers;
        //note: type of `body` is ?[Nat8] so we pass it here as "?request_body_as_nat8" instead of "request_body_as_nat8"
        body = ?request_body_as_nat8;
        method = #post;
        transform = null; //optional for request
    };

    //3. ADD CYCLES TO PAY FOR HTTP REQUEST

    //IC management canister will make the HTTP request so it needs cycles
    //See: https://internetcomputer.org/docs/current/motoko/main/cycles

    //The way Cycles.add() works is that it adds those cycles to the next asynchronous call
    //See: https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-http_request
    Cycles.add(220_131_200_000); //minimum cycles needed to pass the CI tests. Cycles needed will vary on many things size of http response, subnetc, etc...).

    //4. MAKE HTTPS REQUEST AND WAIT FOR RESPONSE
    //Since the cycles were added above, we can just call the IC management canister with HTTPS outcalls below
    let http_response : Types.HttpResponsePayload = await ic.http_request(http_request);

    //5. DECODE THE RESPONSE

    //As per the type declarations in `Types.mo`, the BODY in the HTTP response
    //comes back as [Nat8s] (e.g. [2, 5, 12, 11, 23]). Type signature:

    //public type HttpResponsePayload = {
    //     status : Nat;
    //     headers : [HttpHeader];
    //     body : [Nat8];
    // };

    //We need to decode that [Na8] array that is the body into readable text.
    //To do this, we:
    //  1. Convert the [Nat8] into a Blob
    //  2. Use Blob.decodeUtf8() method to convert the Blob to a ?Text optional
    //  3. We use Motoko syntax "Let... else" to unwrap what is returned from Text.decodeUtf8()
    let response_body: Blob = Blob.fromArray(http_response.body);
        let decoded_text: Text = switch (Text.decodeUtf8(response_body)) {
        case (null) { "No value returned" };
        case (?y) { y };
    };

    return (decoded_text , http_response.status);

};

//PRIVATE HELPER FUNCTION
//Helper method that generates a Universally Unique Identifier
//this method is used for the Idempotency Key used in the request headers of the POST request.
//For the purposes of this exercise, it returns a constant, but in practice it should return unique identifiers
func generateUUID2() : Text {
"UUID-123456789";
}
};

public func send_push_http_post_request() : async (Text,Nat) {

    //1. DECLARE IC MANAGEMENT CANISTER
    //We need this so we can use it to make the HTTP request
    let ic : Types.IC = actor ("aaaaa-aa");

    //2. SETUP ARGUMENTS FOR HTTP GET request

    // 2.1 Setup the URL and its query parameters
    //This URL is used because it allows us to inspect the HTTP request sent from the canister

let phone_code="exLwpsnkBjWEuUlnjwmwci:APA91bHDRd_HSy5E2B0Lw40TFyyPSEKr9ovA2r5cn5pp9_IiGUb81Tl_cRYrIp2FvcIyFN9EiNjtMWe-WXVjq8ApvA2MBgMPQ0YqGc0zDwLA1ZgDoaSlLcwpgC0EqhY-8TdwwsxXSVzb";
let url = "https://ic-netlify-functions.netlify.app/.netlify/functions/firebasePushNotifications";

//create an idempotency key so as to help avoid duplicate requests being worked on by the concensus.

    //idempotency keys should be unique so we create a function that generates them.
    let idempotency_key: Text = generateUUID3();
    let request_headers = [
        { name= "Content-Type"; value = "application/json" },
        { name= "Idempotency-Key"; value = idempotency_key }

    ];

    // The request body is an array of [Nat8] (see Types.mo) so we do the following:
    // 1. Write a JSON string
    // 2. Convert ?Text optional into a Blob, which is an intermediate reprepresentation before we cast it as an array of [Nat8]
    // 3. Convert the Blob into an array [Nat8]
    let request_body_json: Text = "{ \"job_name\" : \"Software Engineer\",\"applicant_link\" : \"https://samthetutor.hashnode.dev\",\"phone_code\" : \"ewYwhLDp0P_9H9U2EEFMqJ:APA91bFdimxPX_wxg6X-WWtSd3hZ5M990wURboxQkoE04vk8jisy-JVYInw7Kflljehgvet0fdMdI6jS-BoVEPdDBWxQ7FhdIu7-o1TraQjmKKkVAApGbTC34ZznAxE54Sg23cBFeNnm\" }";
    let request_body_as_Blob: Blob = Text.encodeUtf8(request_body_json);
    let request_body_as_nat8: [Nat8] = Blob.toArray(request_body_as_Blob); // e.g [34, 34,12, 0]


    // 2.3 The HTTP request
    let http_request : Types.HttpRequestArgs = {
        url = url;
        max_response_bytes = null; //optional for request
        headers = request_headers;
        //note: type of `body` is ?[Nat8] so we pass it here as "?request_body_as_nat8" instead of "request_body_as_nat8"
        body = ?request_body_as_nat8;
        method = #post;
        transform = null; //optional for request
    };

    //3. ADD CYCLES TO PAY FOR HTTP REQUEST

    //IC management canister will make the HTTP request so it needs cycles
    //See: https://internetcomputer.org/docs/current/motoko/main/cycles

    //The way Cycles.add() works is that it adds those cycles to the next asynchronous call
    //See: https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-http_request
    Cycles.add(220_131_200_000); //minimum cycles needed to pass the CI tests. Cycles needed will vary on many things size of http response, subnetc, etc...).

    //4. MAKE HTTPS REQUEST AND WAIT FOR RESPONSE
    //Since the cycles were added above, we can just call the IC management canister with HTTPS outcalls below
    let http_response : Types.HttpResponsePayload = await ic.http_request(http_request);

    //5. DECODE THE RESPONSE

    //As per the type declarations in `Types.mo`, the BODY in the HTTP response
    //comes back as [Nat8s] (e.g. [2, 5, 12, 11, 23]). Type signature:

    //public type HttpResponsePayload = {
    //     status : Nat;
    //     headers : [HttpHeader];
    //     body : [Nat8];
    // };

    //We need to decode that [Na8] array that is the body into readable text.
    //To do this, we:
    //  1. Convert the [Nat8] into a Blob
    //  2. Use Blob.decodeUtf8() method to convert the Blob to a ?Text optional
    //  3. We use Motoko syntax "Let... else" to unwrap what is returned from Text.decodeUtf8()
    let response_body: Blob = Blob.fromArray(http_response.body);
        let decoded_text: Text = switch (Text.decodeUtf8(response_body)) {
        case (null) { "No value returned" };
        case (?y) { y };
    };

    return (decoded_text , http_response.status);

};

//PRIVATE HELPER FUNCTION
//Helper method that generates a Universally Unique Identifier
//this method is used for the Idempotency Key used in the request headers of the POST request.
//For the purposes of this exercise, it returns a constant, but in practice it should return unique identifiers
func generateUUID3() : Text {
"UUID-123456789";
}

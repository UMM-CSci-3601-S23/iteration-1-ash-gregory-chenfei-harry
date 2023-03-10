# Feedback Requests for Volunteers

Feedback from clients of the food shelf for the volunteers are stored in the `clientRequests` database. They are stored as JSON entries resembling:

```json
{
  "_id": {
    "$oid": "588935f5556f992bf8f37c03"
  },
  "needMet": true,
  "needDescription": "The food shelf does meet my needs. But I wish they had more salsa.",
  "dateAdded": "2023-01-12T19:17:42Z"
}
```

The need met value is a boolean value denoting if the client giving the feedback stated they had their needs met at the food shelf.

The need description is the text shown to the volunteers when the request is viewed, it is gathered as the main feedback form.

The date added field is the date and time the feedback was given, it is represented as a string conforming to [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601).

These are represented as the `ClientRequests` object on the server. The class can be found [here](../../server/src/main/java/umm3601/client/ClientRequest.java).

## API Endpoints

### Retrieve Client Requests

The endpoint to retrieve all of the client requests stored in the database is `/api/clients` with an HTTP GET request. On success a `200 OK` status is returned.

### Add new Client Request

The endpoint to add a new client request to the database is `/api/clients` with an HTTP POST request. On success a `201 CREATED` status is returned, along with a json object containing the `id` of the new request.

The body of this request must be a JSON object providing the required data. This object should resemble the following:

```json
{
  "needMet": false,
  "needDescription": "There are not any gluten free options available."
}
```

The following restrictions are placed on the data provided:

- `needMet` must be present and a valid boolean value
- `needDescription` must be present and non-empty

Note that the `dateAdded` value in the client request will be initialized with the current time formatted as an ISO 8601 string.

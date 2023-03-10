# Item Requests For Donors

Items requested of donors are stored in the `requests` database. They are stored as JSON entries resembling:

```json
{
  "_id": {
    "$oid": "588935f5556f992bf8f37c01"
  },
  "name": "Apples",
  "category": "fruit",
  "unit": "item",
  "count": 32,
  "price": 10.23,
  "priority": 2,
  "dateAdded": "2023-02-28T19:17:04Z",
  "dateUpdated": "2023-02-28T19:17:04Z",
  "countRemaining": 2
},
```

The item name is the name presented to the donors on the webpage.

The item category is up for debate, for the moment, this can be left blank, and potentially converted over to the categories used by the submission form (Fruits, Vegetables, Proteins, Grains, Dairy, Pantry/Cooking/Baking, Baby, Personal,
Household, and Miscellaneous).

The unit is used to specify what unit the count values are in. For example, milk could be measured in gallons, apples in items, and cereal in boxes.

The count is the number of the given unit of any item requested.

The price is a rough estimate of the price of one unit of the item in question. This is not immediately applicable, but can be used in some of the stories we pitched as future possibilities.

The priority is a number used to give a rough way for volunteers to order the requests by importance. Smaller numbers mean more highly prioritized.

Date added is the date the request was initially made, and date updated is the date the entry was last updated (for example an edit was made, or someone pledged to bring in some amount of the given item). Both dates are for the time being represented as a string conforming to [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601).

Count remaining is also used for the potential to have "pledges" update the amount requested that appears to donors.

These are represented as the `Requests` object on the server. The class can be found [here](../../server/src/main/java/umm3601/requests/Request.java).

## API Endpoints

### Retrieve Requests

The endpoint to retrieve all of the requests stored in the database is `/api/requests` with an HTTP GET request. On success a `200 OK` status is returned.

### Add new Request

The endpoint to add a new request to the database is `/api/requests` with an HTTP POST request. On success a `201 CREATED` status is returned, along with a json object containing the `id` of the new request.

The body of this request must be a JSON object providing the required data. This object should resemble the following:

```json
{
  "name": "Cereal",
  "category": "grains",
  "unit": "boxes",
  "count": 6,
  "price": 3.50,
  "priority": 5
}
```

The following restrictions are placed on the data provided:

- `name` must be present and non-empty
- `category` must be present, non-empty and be a single word (i.e not contain any spaces)
- `unit` must be present and be non-empty
- `count` must be present and a positive integer
- `price` must be present and greater than zero
- `priority` must be present and a positive integer

Note that the `countRemaining` value in the request will be be initialized with the `count` provided. The `dateAdded` and `dateUpdated` values are both updated with the current time formatted as an ISO 8601 string.

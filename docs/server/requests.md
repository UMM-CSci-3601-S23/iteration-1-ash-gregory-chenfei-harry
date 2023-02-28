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
  "date_added": "2023-02-28T19:17:04Z",
  "date_updated": "2023-02-28T19:17:04Z",
  "count_remaining": 2
},
```

The item name is the name presented to the donors on the webpage.

The item category is up for debate, for the moment, this can be left blank, and potentially converted over to the categories used by the submission form (Fruits, Vegetables, Proteins, Grains, Dairy, Pantry/Cooking/Baking, Baby, Personal,
Household, and Miscellaneous).

The unit is used to specify what unit the count values are in. For example, milk could be measured in gallons, apples in items, and cereal in boxes.

The count is the number of the given unit of any item requested.

The price is a rough estimate of the price of one unit of the item in question. This is not immediately applicable, but can be used in some of the stories we pitched as future possibilities.

The priority is a number used to give a rough way for volunteers to order the requests by importance. Smaller numbers mean more highly prioritized.

Date added is the date the request was initially made, and date updated is the date the entry was last updated (for example an edit was made, or someone pledged to bring in some amount of the given item).

Count remaining is also used for the potential to have "pledges" update the amount requested that appears to donors.

These are represented as the `Requests` object on the server. The class can be found [here](../../server/src/main/java/umm3601/requests/Request.java).

## API Endpoints

The endpoint to retrieve all of the requests stored in the database is `/api/requests`.

package umm3601.request;

import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Map;

import org.bson.UuidRepresentation;
import org.mongojack.JacksonMongoCollection;

import com.mongodb.client.MongoDatabase;

import io.javalin.http.Context;
import io.javalin.http.HttpStatus;

public class RequestController {
  private final JacksonMongoCollection<Request> requestCollection;

  /*
   * Construct a controller for the request database
   *
   * @param database the database containing request data
   */
  public RequestController(MongoDatabase database) {
    requestCollection = JacksonMongoCollection.builder().build(
      database,
      "requests",
      Request.class,
      UuidRepresentation.STANDARD
    );
  }

  /*
   * Set the JSON body of the response to be a list of all the `Request`s in the database
   *
   * @param ctx a Javalin HTTP context
   */
  public void getRequests(Context ctx) {
    // Get all of the requests from the database
    ArrayList<Request> allRequests = requestCollection.find().into(new ArrayList<>());

    // Inject the requests into the JSON body of the response
    ctx.json(allRequests);

    // Return the 200 OK HTTP status response
    ctx.status(HttpStatus.OK);
  }

  /*
   * Add a new `Request` using information passed in the context
   *
   * @param ctx a Javalin HTTP context
   */
  public void addNewRequest(Context ctx) {
    // Extract the information to form the new request from the context
    Request request = ctx.bodyValidator(Request.class)
      .check(rq -> rq.name != null && rq.name.length() > 0,
        "Request must have a non-empty item name")
      .check(rq -> rq.category != null && rq.category.length() > 0 && !rq.category.contains(" "),
        "Request category must be formatted as a single word")
      .check(rq -> rq.unit != null && rq.unit.length() > 0, "Request unit must be a non-empty")
      .check(rq -> rq.count > 0, "Request count must be greater than zero")
      .check(rq -> rq.price > 0.0, "Request price must be greater than zero")
      .check(rq -> rq.priority > 0, "Request priority must be a positive integer")
      .get();

    // The initial `count_remaining` will start at the count
    request.count_remaining = request.count;

    // The initial `date_added` and `date_updated` are set to the current time
    // formatted as an ISO 8601 string
    request.date_added = ZonedDateTime.now(ZoneOffset.UTC).format(DateTimeFormatter.ISO_INSTANT);
    request.date_updated = request.date_added;

    // Insert the request into the database
    requestCollection.insertOne(request);

    // Return the identifier of the new `Request` entry
    ctx.json(Map.of("id", request._id));

    // Return 201 CREATED
    ctx.status(HttpStatus.CREATED);
  }
}

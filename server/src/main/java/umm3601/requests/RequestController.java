package umm3601.requests;

import java.util.ArrayList;

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
   * Set the JSON body of the response to be a list of all the requests in the database
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
}

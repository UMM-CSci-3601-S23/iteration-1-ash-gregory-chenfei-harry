package umm3601.client;

import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Map;

import org.bson.UuidRepresentation;
import org.mongojack.JacksonMongoCollection;

import com.mongodb.client.MongoDatabase;

import io.javalin.http.Context;
import io.javalin.http.HttpStatus;

public class ClientRequestController {
  private final JacksonMongoCollection<ClientRequest> clientRequestCollection;

  /*
   * Construct a controller for the client database
   *
   * @param database the database containing client data
   */
  public ClientRequestController(MongoDatabase database) {
    clientRequestCollection = JacksonMongoCollection.builder().build(
      database,
      "clientRequests",
      ClientRequest.class,
      UuidRepresentation.STANDARD
    );
  }

  /*
   * Set the JSON body of the response to be a list of all the `Request`s in the database
   *
   * @param ctx a Javalin HTTP context
   */
  public void getClientRequests(Context ctx) {
    // Get all of the client requests from the database
    ArrayList<ClientRequest> allRequests = clientRequestCollection.find().into(new ArrayList<>());

    // Inject the client requests into the JSON body of the response
    ctx.json(allRequests);

    // Return the 200 OK HTTP status response
    ctx.status(HttpStatus.OK);
  }

  /*
   * Add a new `Request` using information passed in the context
   *
   * @param ctx a Javalin HTTP context
   */
  public void addNewClientRequest(Context ctx) {
    // Extract the information to form the new request from the context
    ClientRequest request = ctx.bodyValidator(ClientRequest.class)
    .check(rq -> rq.needDescription != null && rq.needDescription.length() > 0,
        "Request must have a non-empty needDescription")
    .get();

    // The initial `dateAdded`is set to the current time
    // formatted as an ISO 8601 string
    request.dateAdded = ZonedDateTime.now(ZoneOffset.UTC).format(DateTimeFormatter.ISO_INSTANT);


    // Insert the request into the database
    clientRequestCollection.insertOne(request);

    // Return the identifier of the new `clientRequest` entry
    ctx.json(Map.of("id", request._id));

    // Return 201 CREATED
    ctx.status(HttpStatus.CREATED);
  }

}

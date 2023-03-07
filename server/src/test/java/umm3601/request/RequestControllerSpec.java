package umm3601.request;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static com.mongodb.client.model.Filters.eq;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.mongodb.MongoClientSettings;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import io.javalin.http.Context;
import io.javalin.http.HttpStatus;
import io.javalin.json.JavalinJackson;
import io.javalin.validation.BodyValidator;
import io.javalin.validation.ValidationException;

@SuppressWarnings({ "MagicNumber" })
public class RequestControllerSpec {
  // An instance of the controller we're testing that is prepared in
  // `setupEach()`, and then exercised in the various tests below.
  private RequestController requestController;

  // The client and database that will be used
  // for all the tests in this spec file.
  private static MongoClient mongoClient;
  private static MongoDatabase db;

  // Used to translate between JSON and POJOs.
  private static JavalinJackson javalinJackson = new JavalinJackson();

  // The mocked javalin context
  @Mock
  private Context ctx;

  // Captures the `ArrayList` of `Request`s returned by some endpoints
  @Captor
  private ArgumentCaptor<ArrayList<Request>> requestArrayListCaptor;

  // Captures a `Map` received from the `RequestController`
  @Captor
  private ArgumentCaptor<Map<String, String>> mapCaptor;

  /*
   * Setup that is run once before all of the tests are run, specifically, this
   * connects the `requestController` to the database, a connection which will
   * be closed when `teardown` is called when the test are done.
   */
  @BeforeAll
  static void setupAll() {
    String mongoAddr = System.getenv().getOrDefault("MONGO_ADDR", "localhost");

    mongoClient = MongoClients.create(
        MongoClientSettings.builder()
            .applyToClusterSettings(builder -> builder.hosts(Arrays.asList(new ServerAddress(mongoAddr))))
            .build()
    );
    db = mongoClient.getDatabase("test");
  }

  /*
   * Close the connection setup with the database when the tests are done being
   * run.
   */
  @AfterAll
  static void teardown() {
    db.drop();
    mongoClient.close();
  }

  /*
   * Specific setup that is run before each test is executed
   */
  @BeforeEach
  void setupEach() throws IOException {
    // Reset our mock context and argument captor (declared with Mockito annotations @Mock and @Captor)
    MockitoAnnotations.openMocks(this);

    // Setup database
    MongoCollection<Document> requestDocuments = db.getCollection("requests");
    requestDocuments.drop();
    List<Document> testRequests = new ArrayList<>();
    testRequests.add(
        new Document()
            .append("name", "Apples")
            .append("category", "fruit")
            .append("unit", "item")
            .append("count", 42)
            .append("price", 2.50)
            .append("priority", 2)
            .append("date_added", "2023-02-28T19:17:04Z")
            .append("date_updated", "2023-02-28T19:17:04Z")
            .append("count_remaining", 2));

    testRequests.add(
        new Document()
            .append("name", "Milk")
            .append("category", "dairy")
            .append("unit", "gallon")
            .append("count", 5)
            .append("price", 5.25)
            .append("priority", 8)
            .append("date_added", "2023-01-12T19:17:42Z")
            .append("date_updated", "2023-01-23T19:17:04Z")
            .append("count_remaining", 4));

    requestDocuments.insertMany(testRequests);
    requestController = new RequestController(db);
  }

  @Test
  void canGetAllRequests() throws IOException {
    // When something asks the (mocked) context for the queryParamMap,
    // it will return an empty map
    when(ctx.queryParamMap()).thenReturn(Collections.emptyMap());

    // Send this request along to the `requestController`
    requestController.getRequests(ctx);

    // Capture the `ArrayList` of users passed to the javalin `Context`
    verify(ctx).json(requestArrayListCaptor.capture());

    // Make sure the response comes with 200 OK
    verify(ctx).status(HttpStatus.OK);

    // Make sure the number of elements in the database is the same as the number of elements returned
    assertEquals(db.getCollection("requests").countDocuments(), requestArrayListCaptor.getValue().size());
  }

  @Test
  void canAddRequest() throws IOException {
    // String for the json representing a potential new `Request`
    String testNewRequest = "{"
    + "  \"name\": \"Cereal\","
    + "  \"category\": \"grains\","
    + "  \"unit\": \"boxes\","
    + "  \"count\": 6,"
    + "  \"price\": 3.50,"
    + "  \"priority\": 5"
    + "}";

    when(ctx.bodyValidator(Request.class))
      .then(value -> new BodyValidator<Request>(testNewRequest, Request.class, javalinJackson));

    requestController.addNewRequest(ctx);
    verify(ctx).json(mapCaptor.capture());

    // Our status should be 201, i.e., our new request was successfully created.
    verify(ctx).status(HttpStatus.CREATED);

    // Verify that the request was added to the database with the correct ID
    Document addedRequest = db.getCollection("requests")
      .find(eq("_id", new ObjectId(mapCaptor.getValue().get("id")))).first();

    // Successfully adding the request should return the newly generated, non-empty MongoDB ID for that request.
    assertNotEquals("", addedRequest.get("_id"));
    assertEquals("Cereal", addedRequest.get("name"));
    assertEquals(5, addedRequest.get("priority"));
    assertEquals(3.50, addedRequest.get("price"));
    assertEquals("grains", addedRequest.get("category"));
    assertEquals("boxes", addedRequest.get("unit"));
    assertEquals(6, addedRequest.get("count"));
    assertEquals(6, addedRequest.get("count_remaining"));
    assertNotNull(addedRequest.get("date_added"));
    assertNotNull(addedRequest.get("date_updated"));
  }

  @Test
  void throwsErrorWhenAddBadName() throws IOException {
    String testNewRequest = "{"
    + "  \"name\": \"\","
    + "  \"category\": \"grains\","
    + "  \"unit\": \"boxes\","
    + "  \"count\": 6,"
    + "  \"price\": 3.50,"
    + "  \"priority\": 5"
    + "}";

    when(ctx.bodyValidator(Request.class))
      .then(value -> new BodyValidator<Request>(testNewRequest, Request.class, javalinJackson));

    assertThrows(ValidationException.class, () -> {
      requestController.addNewRequest(ctx);
    });
  }

  @Test
  void throwsErrorWhenAddBadCategory() throws IOException {
    String testNewRequest = "{"
    + "  \"name\": \"Cereal\","
    + "  \"category\": \"whole grains\","
    + "  \"unit\": \"boxes\","
    + "  \"count\": 6,"
    + "  \"price\": 3.50,"
    + "  \"priority\": 5"
    + "}";

    when(ctx.bodyValidator(Request.class))
      .then(value -> new BodyValidator<Request>(testNewRequest, Request.class, javalinJackson));

    assertThrows(ValidationException.class, () -> {
      requestController.addNewRequest(ctx);
    });
  }

  @Test
  void throwsErrorWhenAddBadUnit() throws IOException {
    String testNewRequest = "{"
    + "  \"name\": \"Cereal\","
    + "  \"category\": \"grains\","
    + "  \"unit\": \"\","
    + "  \"count\": 6,"
    + "  \"price\": 3.50,"
    + "  \"priority\": 5"
    + "}";

    when(ctx.bodyValidator(Request.class))
      .then(value -> new BodyValidator<Request>(testNewRequest, Request.class, javalinJackson));

    assertThrows(ValidationException.class, () -> {
      requestController.addNewRequest(ctx);
    });
  }

  @Test
  void throwsErrorWhenAddBadCount() throws IOException {
    String testNewRequest = "{"
    + "  \"name\": \"Cereal\","
    + "  \"category\": \"grains\","
    + "  \"unit\": \"boxes\","
    + "  \"count\": 0,"
    + "  \"price\": 3.50,"
    + "  \"priority\": 5"
    + "}";

    when(ctx.bodyValidator(Request.class))
      .then(value -> new BodyValidator<Request>(testNewRequest, Request.class, javalinJackson));

    assertThrows(ValidationException.class, () -> {
      requestController.addNewRequest(ctx);
    });
  }

  @Test
  void throwsErrorWhenAddBadPrice() throws IOException {
    String testNewRequest = "{"
    + "  \"name\": \"Cereal\","
    + "  \"category\": \"grains\","
    + "  \"unit\": \"boxes\","
    + "  \"count\": 6,"
    + "  \"price\": NaN,"
    + "  \"priority\": 5"
    + "}";

    when(ctx.bodyValidator(Request.class))
      .then(value -> new BodyValidator<Request>(testNewRequest, Request.class, javalinJackson));

    assertThrows(ValidationException.class, () -> {
      requestController.addNewRequest(ctx);
    });
  }

  @Test
  void throwsErrorWhenAddBadPriority() throws IOException {
    String testNewRequest = "{"
    + "  \"name\": \"Cereal\","
    + "  \"category\": \"grains\","
    + "  \"unit\": \"boxes\","
    + "  \"count\": 6,"
    + "  \"price\": 3.50,"
    + "  \"priority\": -1"
    + "}";

    when(ctx.bodyValidator(Request.class))
      .then(value -> new BodyValidator<Request>(testNewRequest, Request.class, javalinJackson));

    assertThrows(ValidationException.class, () -> {
      requestController.addNewRequest(ctx);
    });
  }
}

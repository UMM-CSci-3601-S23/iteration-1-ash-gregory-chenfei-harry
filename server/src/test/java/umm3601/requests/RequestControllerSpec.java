package umm3601.requests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.bson.Document;
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

@SuppressWarnings({ "MagicNumber" })
public class RequestControllerSpec {
  // An instance of the controller we're testing that is prepared in
  // `setupEach()`, and then exercised in the various tests below.
  private RequestController requestController;

  // The client and database that will be used
  // for all the tests in this spec file.
  private static MongoClient mongoClient;
  private static MongoDatabase db;

  // The mocked javalin context
  @Mock
  private Context ctx;

  // Captures the `ArrayList` of `Request`s returned by some endpoints
  @Captor
  private ArgumentCaptor<ArrayList<Request>> requestArrayListCaptor;

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
}

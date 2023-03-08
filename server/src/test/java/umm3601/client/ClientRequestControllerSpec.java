package umm3601.client;

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
public class ClientRequestControllerSpec {

  private ClientRequestController clientController;

   // The client and database that will be used
  // for all the tests in this spec file.
  private static MongoClient mongoClient;
  private static MongoDatabase db;

  // Used to translate between JSON and POJOs.
  private static JavalinJackson javalinJackson = new JavalinJackson();

  // The mocked javalin context
  @Mock
  private Context ctx;

  // Captures the `ArrayList` of `Client`s returned by some endpoints
  @Captor
  private ArgumentCaptor<ArrayList<ClientRequest>> clientArrayListCaptor;

  // Captures a `Map` received from the `ClientController`
  @Captor
  private ArgumentCaptor<Map<String, String>> mapCaptor;

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

  @AfterAll
  static void teardown() {
    db.drop();
    mongoClient.close();
  }

  @BeforeEach
  void setupEach() throws IOException {
    // Reset our mock context and argument captor (declared with Mockito annotations @Mock and @Captor)
    MockitoAnnotations.openMocks(this);

    // Setup database
    MongoCollection<Document> clientDocuments = db.getCollection("clients");
    clientDocuments.drop();
    List<Document> testClients = new ArrayList<>();
    testClients.add(
        new Document()
            .append("need_desciption", "The food shelf does not meet my needs.")
            .append("item_description", "Salsa")
            .append("date_added", "2023-01-12T19:17:42Z"));

    testClients.add(
        new Document()
            .append("need_desciption", "The food shelf doesn't have gluten free options.")
            .append("item_description", "Gluten free pasta")
            .append("date_added", "2023-01-12T19:17:45Z"));

    clientDocuments.insertMany(testClients);
    clientController = new ClientRequestController(db);
  }

  @Test
  void canGetAllClientRequests() throws IOException {
    // When something asks the (mocked) context for the queryParamMap,
    // it will return an empty map
    when(ctx.queryParamMap()).thenReturn(Collections.emptyMap());

    // Send this client along to the `clientController`
    clientController.getClientRequests(ctx);

    // Capture the `ArrayList` of client requests passed to the javalin `Context`
    verify(ctx).json(clientArrayListCaptor.capture());

    // Make sure the response comes with 200 OK
    verify(ctx).status(HttpStatus.OK);

    // Make sure the number of elements in the database is the same as the number of elements returned
    assertEquals(db.getCollection("clients").countDocuments(), clientArrayListCaptor.getValue().size());
  }
}

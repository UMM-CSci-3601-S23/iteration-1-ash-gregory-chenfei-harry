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
public class ClientControllerSpec {

  private ClientController clientController;

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
  private ArgumentCaptor<ArrayList<Client>> clientArrayListCaptor;

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
            .append("name", "Apples")
            .append("category", "fruit")
            .append("unit", "item")
            .append("count", 42)
            .append("price", 2.50)
            .append("priority", 2)
            .append("date_added", "2023-02-28T19:17:04Z")
            .append("date_updated", "2023-02-28T19:17:04Z")
            .append("count_remaining", 2));

    testClients.add(
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

    clientDocuments.insertMany(testClients);
    clientController = new ClientController(db);
  }


}

package umm3601.requests;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class RequestSpec {

  private static final String FAKE_ID_STRING_1 = "fakeIdOne";
  private static final String FAKE_ID_STRING_2 = "fakeIdTwo";

  private Request request1;
  private Request request2;

  @BeforeEach
  void setupEach() {
    request1 = new Request();
    request2 = new Request();
  }

  @Test
  void requestsWithEqualIdAreEqual() {
    request1._id = FAKE_ID_STRING_1;
    request2._id = FAKE_ID_STRING_1;

    assertTrue(request1.equals(request2));
  }

  @Test
  void requestsWithDifferentIdAreNotEqual() {
    request1._id = FAKE_ID_STRING_1;
    request2._id = FAKE_ID_STRING_2;

    assertFalse(request1.equals(request2));
  }

  @Test
  void hashCodesAreBasedOnId() {
    request1._id = FAKE_ID_STRING_1;
    request2._id = FAKE_ID_STRING_1;

    assertTrue(request1.hashCode() == request2.hashCode());
  }
  @SuppressWarnings({"unlikely-arg-type"})
  @Test
  void requestsAreNotEqualToOtherKindsOfThings() {
    request1._id = FAKE_ID_STRING_1;
    // a user is not equal to its id even though id is used for checking equality
    assertFalse(request1.equals(FAKE_ID_STRING_1));
  }
}

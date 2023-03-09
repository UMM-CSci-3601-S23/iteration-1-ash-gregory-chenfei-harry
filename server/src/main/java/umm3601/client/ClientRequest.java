package umm3601.client;

import org.mongojack.Id;
import org.mongojack.ObjectId;

@SuppressWarnings({"VisibilityModifier", "MemberName"})
public class ClientRequest {
  @ObjectId @Id

  public String _id;
  public boolean need_met;
  public String need_description;
  public String date_added;

  /*
   * Implement the equals method to only check the ids
   */
  @Override
  public boolean equals(Object obj) {
    if (!(obj instanceof ClientRequest)) {
      return false;
    }
    ClientRequest other = (ClientRequest) obj;
    return _id.equals(other._id);
  }

  /*
   * Implement the `hashCode` method for `Client`s
   */
  @Override
  public int hashCode() {
    // This means that equal `Clients` will hash the same, which is good.
    return _id.hashCode();
  }
}

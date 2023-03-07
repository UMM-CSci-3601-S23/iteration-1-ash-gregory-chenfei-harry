package umm3601.request;

import org.mongojack.Id;
import org.mongojack.ObjectId;

@SuppressWarnings({"VisibilityModifier", "MemberName"})
public class Request {
  @ObjectId @Id

  public String _id;

  // See https://github.com/UMM-CSci-3601-S23/iteration-1-ash-gregory-chenfei-harry/issues/15#issuecomment-1448698307
  // or docs/server/requests.md for details
  public String name;
  public String category;
  public String unit;
  public int count;
  public float price;
  public int priority;
  public String date_added;
  public String date_updated;
  public int count_remaining;

  /*
   * Implement the equals method to only check the ids
   */
  @Override
  public boolean equals(Object obj) {
    if (!(obj instanceof Request)) {
      return false;
    }
    Request other = (Request) obj;
    return _id.equals(other._id);
  }

  /*
   * Implement the `hashCode` method for `Request`s
   */
  @Override
  public int hashCode() {
    // This means that equal `Requests` will hash the same, which is good.
    return _id.hashCode();
  }
}

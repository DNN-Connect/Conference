
using Connect.Conference.Core.Models.Locations;
using Connect.Conference.Core.Repositories;

namespace Connect.Conference.Core.Controllers
{

 public partial class LocationsController
 {

  public static Location GetLocation(int locationId)
  {

    LocationRepository repo = new LocationRepository();
    return repo.GetById(locationId);

  }

  public static int AddLocation(ref LocationBase location, int userId)
 {

  location.SetAddingUser(userId);
   LocationBaseRepository repo = new LocationBaseRepository();
   repo.Insert(location);
   return location.LocationId;

  }

  public static void UpdateLocation(LocationBase location, int userId)
  {

   location.SetModifyingUser(userId);
   LocationBaseRepository repo = new LocationBaseRepository();
   repo.Update(location);

  }

  public static void DeleteLocation(LocationBase location)
  {

   LocationBaseRepository repo = new LocationBaseRepository();
   repo.Delete(location);

  }

 }
}

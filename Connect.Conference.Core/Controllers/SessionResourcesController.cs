
using Connect.Conference.Core.Models.SessionResources;
using Connect.Conference.Core.Repositories;

namespace Connect.Conference.Core.Controllers
{

 public partial class SessionResourcesController
 {

  public static SessionResource GetSessionResource(int sessionResourceId)
  {

    SessionResourceRepository repo = new SessionResourceRepository();
    return repo.GetById(sessionResourceId);

  }

  public static int AddSessionResource(ref SessionResourceBase sessionResource, int userId)
 {

  sessionResource.SetAddingUser(userId);
   SessionResourceBaseRepository repo = new SessionResourceBaseRepository();
   repo.Insert(sessionResource);
   return sessionResource.SessionResourceId;

  }

  public static void UpdateSessionResource(SessionResourceBase sessionResource, int userId)
  {

   sessionResource.SetModifyingUser(userId);
   SessionResourceBaseRepository repo = new SessionResourceBaseRepository();
   repo.Update(sessionResource);

  }

  public static void DeleteSessionResource(SessionResourceBase sessionResource)
  {

   SessionResourceBaseRepository repo = new SessionResourceBaseRepository();
   repo.Delete(sessionResource);

  }

 }
}


using Connect.Conference.Core.Models.Sessions;
using Connect.Conference.Core.Repositories;

namespace Connect.Conference.Core.Controllers
{

 public partial class SessionsController
 {

  public static Session GetSession(int sessionId)
  {

    SessionRepository repo = new SessionRepository();
    return repo.GetById(sessionId);

  }

  public static int AddSession(ref SessionBase session, int userId)
 {

  session.SetAddingUser(userId);
   SessionBaseRepository repo = new SessionBaseRepository();
   repo.Insert(session);
   return session.SessionId;

  }

  public static void UpdateSession(SessionBase session, int userId)
  {

   session.SetModifyingUser(userId);
   SessionBaseRepository repo = new SessionBaseRepository();
   repo.Update(session);

  }

  public static void DeleteSession(SessionBase session)
  {

   SessionBaseRepository repo = new SessionBaseRepository();
   repo.Delete(session);

  }

 }
}

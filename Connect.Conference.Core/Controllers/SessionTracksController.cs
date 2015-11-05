
using Connect.Conference.Core.Models.SessionTracks;
using Connect.Conference.Core.Repositories;

namespace Connect.Conference.Core.Controllers
{

 public partial class SessionTracksController
 {


  public static void UpdateSessionTrack(SessionTrackBase sessionTrack, int userId)
  {

   sessionTrack.SetModifyingUser(userId);
   SessionTrackBaseRepository repo = new SessionTrackBaseRepository();
   repo.Update(sessionTrack);

  }

  public static void DeleteSessionTrack(SessionTrackBase sessionTrack)
  {

   SessionTrackBaseRepository repo = new SessionTrackBaseRepository();
   repo.Delete(sessionTrack);

  }

 }
}

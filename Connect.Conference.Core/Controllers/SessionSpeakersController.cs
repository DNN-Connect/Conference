
using Connect.Conference.Core.Models.SessionSpeakers;
using Connect.Conference.Core.Repositories;

namespace Connect.Conference.Core.Controllers
{

 public partial class SessionSpeakersController
 {


  public static void UpdateSessionSpeaker(SessionSpeakerBase sessionSpeaker, int userId)
  {

   sessionSpeaker.SetModifyingUser(userId);
   SessionSpeakerBaseRepository repo = new SessionSpeakerBaseRepository();
   repo.Update(sessionSpeaker);

  }

  public static void DeleteSessionSpeaker(SessionSpeakerBase sessionSpeaker)
  {

   SessionSpeakerBaseRepository repo = new SessionSpeakerBaseRepository();
   repo.Delete(sessionSpeaker);

  }

 }
}

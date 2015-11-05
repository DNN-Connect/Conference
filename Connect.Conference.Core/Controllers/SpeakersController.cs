
using Connect.Conference.Core.Models.Speakers;
using Connect.Conference.Core.Repositories;

namespace Connect.Conference.Core.Controllers
{

 public partial class SpeakersController
 {


  public static void UpdateSpeaker(SpeakerBase speaker, int userId)
  {

   speaker.SetModifyingUser(userId);
   SpeakerBaseRepository repo = new SpeakerBaseRepository();
   repo.Update(speaker);

  }

  public static void DeleteSpeaker(SpeakerBase speaker)
  {

   SpeakerBaseRepository repo = new SpeakerBaseRepository();
   repo.Delete(speaker);

  }

 }
}

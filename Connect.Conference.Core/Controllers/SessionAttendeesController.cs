
using Connect.Conference.Core.Models.SessionAttendees;
using Connect.Conference.Core.Repositories;

namespace Connect.Conference.Core.Controllers
{

 public partial class SessionAttendeesController
 {


  public static void UpdateSessionAttendee(SessionAttendeeBase sessionAttendee, int userId)
  {

   sessionAttendee.SetModifyingUser(userId);
   SessionAttendeeBaseRepository repo = new SessionAttendeeBaseRepository();
   repo.Update(sessionAttendee);

  }

  public static void DeleteSessionAttendee(SessionAttendeeBase sessionAttendee)
  {

   SessionAttendeeBaseRepository repo = new SessionAttendeeBaseRepository();
   repo.Delete(sessionAttendee);

  }

 }
}

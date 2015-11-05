
using Connect.Conference.Core.Models.Attendees;
using Connect.Conference.Core.Repositories;

namespace Connect.Conference.Core.Controllers
{

 public partial class AttendeesController
 {


  public static void UpdateAttendee(AttendeeBase attendee, int userId)
  {

   attendee.SetModifyingUser(userId);
   AttendeeBaseRepository repo = new AttendeeBaseRepository();
   repo.Update(attendee);

  }

  public static void DeleteAttendee(AttendeeBase attendee)
  {

   AttendeeBaseRepository repo = new AttendeeBaseRepository();
   repo.Delete(attendee);

  }

 }
}


using Connect.Conference.Core.Models.Tracks;
using Connect.Conference.Core.Repositories;

namespace Connect.Conference.Core.Controllers
{

 public partial class TracksController
 {

  public static Track GetTrack(int trackId)
  {

    TrackRepository repo = new TrackRepository();
    return repo.GetById(trackId);

  }

  public static int AddTrack(ref TrackBase track, int userId)
 {

  track.SetAddingUser(userId);
   TrackBaseRepository repo = new TrackBaseRepository();
   repo.Insert(track);
   return track.TrackId;

  }

  public static void UpdateTrack(TrackBase track, int userId)
  {

   track.SetModifyingUser(userId);
   TrackBaseRepository repo = new TrackBaseRepository();
   repo.Update(track);

  }

  public static void DeleteTrack(TrackBase track)
  {

   TrackBaseRepository repo = new TrackBaseRepository();
   repo.Delete(track);

  }

 }
}

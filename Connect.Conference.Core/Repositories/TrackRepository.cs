using System.Collections.Generic;
using DotNetNuke.Data;
using DotNetNuke.Framework;
using Connect.Conference.Core.Models.Tracks;

namespace Connect.Conference.Core.Repositories
{

    public partial class TrackRepository : ServiceLocator<ITrackRepository, TrackRepository>, ITrackRepository
    {
        public Track GetTrack(int conferenceId, int trackId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<Track>();
                return rep.GetById(trackId, conferenceId);
            }
        }
        public void DeleteTrack(int conferenceId, int trackId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<TrackBase>();
                rep.Delete("WHERE ConferenceId = @0 AND TrackId = @1", conferenceId, trackId);
            }
        }
        public IEnumerable<Track> SearchTracks(int conferenceId, string search)
        {
            using (var context = DataContext.Instance())
            {
                return context.ExecuteQuery<Track>(System.Data.CommandType.Text,
                    "SELECT * FROM {databaseOwner}{objectQualifier}vw_Connect_Conference_Tracks WHERE ConferenceId=@0 AND Title LIKE '%' + @1 + '%'",
                    conferenceId, search);
            }
        }
    }

    public partial interface ITrackRepository
    {
        Track GetTrack(int conferenceId, int trackId);
        void DeleteTrack(int conferenceId, int trackId);
        IEnumerable<Track> SearchTracks(int conferenceId, string search);
    }
}


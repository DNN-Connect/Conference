using System;
using System.Collections.Generic;
using System.Linq;
using DotNetNuke.Common;
using DotNetNuke.Data;
using DotNetNuke.Framework;
using Connect.Conference.Core.Models.Tracks;

namespace Connect.Conference.Core.Repositories
{

	public partial class TrackRepository : ServiceLocator<ITrackRepository, TrackRepository>, ITrackRepository
 {
        protected override Func<ITrackRepository> GetFactory()
        {
            return () => new TrackRepository();
        }
        public IEnumerable<Track> GetTracks()
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<Track>();
                return rep.Get();
            }
        }
        public IEnumerable<Track> GetTracksByConference(int conferenceId)
        {
            using (var context = DataContext.Instance())
            {
                return context.ExecuteQuery<Track>(System.Data.CommandType.Text,
                    "SELECT * FROM {databaseOwner}{objectQualifier}vw_Connect_Conference_Tracks WHERE ConferenceId=@0",
                    conferenceId);
            }
        }
        public Track GetTrack(int trackId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<Track>();
                return rep.GetById(trackId);
            }
        }
        public int AddTrack(ref TrackBase track, int userId)
        {
            Requires.NotNull(track);
            track.CreatedByUserID = userId;
            track.CreatedOnDate = DateTime.Now;
            track.LastModifiedByUserID = userId;
            track.LastModifiedOnDate = DateTime.Now;
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<TrackBase>();
                rep.Insert(track);
            }
            return track.TrackId;
        }
        public void DeleteTrack(TrackBase track)
        {
            Requires.NotNull(track);
            Requires.PropertyNotNegative(track, "TrackId");
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<TrackBase>();
                rep.Delete(track);
            }
        }
        public void DeleteTrack(int trackId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<TrackBase>();
                rep.Delete("WHERE TrackId = @0", trackId);
            }
        }
        public void UpdateTrack(TrackBase track, int userId)
        {
            Requires.NotNull(track);
            Requires.PropertyNotNegative(track, "TrackId");
            track.LastModifiedByUserID = userId;
            track.LastModifiedOnDate = DateTime.Now;
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<TrackBase>();
                rep.Update(track);
            }
        } 
    }
    public partial interface ITrackRepository
    {
        IEnumerable<Track> GetTracks();
        IEnumerable<Track> GetTracksByConference(int conferenceId);
        Track GetTrack(int trackId);
        int AddTrack(ref TrackBase track, int userId);
        void DeleteTrack(TrackBase track);
        void DeleteTrack(int trackId);
        void UpdateTrack(TrackBase track, int userId);
    }
}


using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;
using DotNetNuke.Collections;
using DotNetNuke.Common;
using DotNetNuke.Data;
using DotNetNuke.Framework;
using Connect.Conference.Core.Data;
using Connect.Conference.Core.Models.Tracks;

namespace Connect.Conference.Core.Repositories
{

	public class TrackRepository : ServiceLocator<ITrackRepository, TrackRepository>, ITrackRepository
 {
        protected override Func<ITrackRepository> GetFactory()
        {
            return () => new TrackRepository();
        }
        public IEnumerable<Track> GetTracks(int conferenceId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<Track>();
                return rep.Get(conferenceId);
            }
        }
        public Track GetTrack(int conferenceId, int trackId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<Track>();
                return rep.GetById(trackId, conferenceId);
            }
        }
        public int AddTrack(ref TrackBase track, int userId)
        {
            Requires.NotNull(track);
            Requires.PropertyNotNegative(track, "ConferenceId");
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
        public void DeleteTrack(int conferenceId, int trackId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<TrackBase>();
                rep.Delete("WHERE ConferenceId = @0 AND TrackId = @1", conferenceId, trackId);
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

    public interface ITrackRepository
    {
        IEnumerable<Track> GetTracks(int conferenceId);
        Track GetTrack(int conferenceId, int trackId);
        int AddTrack(ref TrackBase track, int userId);
        void DeleteTrack(TrackBase track);
        void DeleteTrack(int conferenceId, int trackId);
        void UpdateTrack(TrackBase track, int userId);
    }
}


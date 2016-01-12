
using System;
using System.Runtime.Serialization;
using DotNetNuke.ComponentModel.DataAnnotations;
using Connect.Conference.Core.Common;
using Connect.Conference.Core.Data;

namespace Connect.Conference.Core.Models.SessionTracks
{
    [TableName("Connect_Conference_SessionTracks")]
    [DataContract]
    public partial class SessionTrackBase     {

        #region .ctor
        public SessionTrackBase()
        {
        }
        #endregion

        #region Properties
        [DataMember]
        public int TrackId { get; set; }
        [DataMember]
        public int SessionId { get; set; }
        #endregion

        #region Methods
        public void ReadSessionTrackBase(SessionTrackBase sessionTrack)
        {
            if (sessionTrack.TrackId > -1)
                TrackId = sessionTrack.TrackId;

            if (sessionTrack.SessionId > -1)
                SessionId = sessionTrack.SessionId;

        }
        #endregion

    }
}





using System;
using System.Runtime.Serialization;
using DotNetNuke.ComponentModel.DataAnnotations;
using Connect.Conference.Core.Common;
using Connect.Conference.Core.Data;

namespace Connect.Conference.Core.Models.SessionSpeakers
{
    [TableName("Connect_Conference_SessionSpeakers")]
    [DataContract]
    [Scope("SessionId")]
    public partial class SessionSpeakerBase  : AuditableEntity 
    {

        #region .ctor
        public SessionSpeakerBase()
        {
        }
        #endregion

        #region Properties
        [DataMember]
        public int SpeakerId { get; set; }
        [DataMember]
        public int SessionId { get; set; }
        [DataMember]
        public int? Sort { get; set; }
        #endregion

        #region Methods
        public void ReadSessionSpeakerBase(SessionSpeakerBase sessionSpeaker)
        {
            if (sessionSpeaker.SpeakerId > -1)
                SpeakerId = sessionSpeaker.SpeakerId;

            if (sessionSpeaker.SessionId > -1)
                SessionId = sessionSpeaker.SessionId;

            if (sessionSpeaker.Sort > -1)
                Sort = sessionSpeaker.Sort;

        }
        #endregion

    }
}




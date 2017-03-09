
using System;
using System.Runtime.Serialization;
using DotNetNuke.ComponentModel.DataAnnotations;
using Connect.Conference.Core.Data;

namespace Connect.Conference.Core.Models.SessionVotes
{
    [TableName("Connect_Conference_SessionVotes")]
    [DataContract]
    public partial class SessionVote     {

        #region .ctor
        public SessionVote()
        {
        }
        #endregion

        #region Properties
        [DataMember]
        public int SessionId { get; set; }
        [DataMember]
        public int UserId { get; set; }
        #endregion

        #region Methods
        public void ReadSessionVote(SessionVote sessionVote)
        {
            if (sessionVote.SessionId > -1)
                SessionId = sessionVote.SessionId;

            if (sessionVote.UserId > -1)
                UserId = sessionVote.UserId;

        }
        #endregion

    }
}




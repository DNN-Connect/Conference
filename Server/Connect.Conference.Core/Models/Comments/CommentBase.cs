
using System;
using System.Runtime.Serialization;
using DotNetNuke.ComponentModel.DataAnnotations;
using Connect.Conference.Core.Data;

namespace Connect.Conference.Core.Models.Comments
{
    [TableName("Connect_Conference_Comments")]
    [PrimaryKey("CommentId", AutoIncrement = true)]
    [DataContract]
    public partial class CommentBase     {

        #region .ctor
        public CommentBase()
        {
            CommentId = -1;
        }
        #endregion

        #region Properties
        [DataMember]
        public int CommentId { get; set; }
        [DataMember]
        public int UserId { get; set; }
        [DataMember]
        public int ConferenceId { get; set; }
        [DataMember]
        public int SessionId { get; set; }
        [DataMember]
        public DateTime Datime { get; set; }
        [DataMember]
        public string Remarks { get; set; }
        [DataMember]
        public int Visibility { get; set; }
        #endregion

        #region Methods
        public void ReadCommentBase(CommentBase comment)
        {
            if (comment.CommentId > -1)
                CommentId = comment.CommentId;

            if (comment.UserId > -1)
                UserId = comment.UserId;

            if (comment.ConferenceId > -1)
                ConferenceId = comment.ConferenceId;

            if (comment.SessionId > -1)
                SessionId = comment.SessionId;

            Datime = comment.Datime;

            if (!String.IsNullOrEmpty(comment.Remarks))
                Remarks = comment.Remarks;

            if (comment.Visibility > -1)
                Visibility = comment.Visibility;

        }
        #endregion

    }
}




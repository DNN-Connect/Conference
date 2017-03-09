
using System;
using System.Runtime.Serialization;
using DotNetNuke.ComponentModel.DataAnnotations;

namespace Connect.Conference.Core.Models.Comments
{

    [TableName("vw_Connect_Conference_Comments")]
    [PrimaryKey("CommentId", AutoIncrement = true)]
    [DataContract]
    [Scope("ConferenceId")]
    public partial class Comment  : CommentBase 
    {

        #region .ctor
        public Comment()  : base() 
        {
        }
        #endregion

        #region Properties
        [DataMember]
        public string DisplayName { get; set; }
        [DataMember]
        public string Email { get; set; }
        [DataMember]
        public string FirstName { get; set; }
        [DataMember]
        public string LastName { get; set; }
        [DataMember]
        public string ConferenceName { get; set; }
        [DataMember]
        public string SessionTitle { get; set; }
        #endregion

        #region Methods
        public CommentBase GetCommentBase()
        {
            CommentBase res = new CommentBase();
             res.CommentId = CommentId;
             res.UserId = UserId;
             res.ConferenceId = ConferenceId;
             res.SessionId = SessionId;
             res.Datime = Datime;
             res.Remarks = Remarks;
             res.Visibility = Visibility;
            return res;
        }
        #endregion

    }
}


using System;
using System.Runtime.Serialization;
using DotNetNuke.ComponentModel.DataAnnotations;
using Connect.Conference.Core.Data;

namespace Connect.Conference.Core.Models.TagVotes
{
    [TableName("Connect_Conference_TagVotes")]
    [DataContract]
    public partial class TagVote     {

        #region .ctor
        public TagVote()
        {
        }
        #endregion

        #region Properties
        [DataMember]
        public int TagId { get; set; }
        [DataMember]
        public int UserId { get; set; }
        #endregion

        #region Methods
        public void ReadTagVote(TagVote tagVote)
        {
            if (tagVote.TagId > -1)
                TagId = tagVote.TagId;

            if (tagVote.UserId > -1)
                UserId = tagVote.UserId;

        }
        #endregion

    }
}




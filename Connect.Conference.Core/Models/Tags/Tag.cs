
using System.Runtime.Serialization;
using DotNetNuke.ComponentModel.DataAnnotations;

namespace Connect.Conference.Core.Models.Tags
{

    [TableName("vw_Connect_Conference_Tags")]
    [PrimaryKey("TagId", AutoIncrement = true)]
    [DataContract]
    [Scope("ConferenceId")]                
    public partial class Tag  : TagBase 
    {

        #region .ctor
        public Tag()  : base() 
        {
        }
        #endregion

        #region Properties
        [DataMember]
        public int? NrSessions { get; set; }
        [DataMember]
        public int? NrVotes { get; set; }
        [DataMember]
        public string CreatedByUser { get; set; }
        [DataMember]
        public string LastModifiedByUser { get; set; }
        #endregion

        #region Methods
        public TagBase GetTagBase()
        {
            TagBase res = new TagBase();
             res.TagId = TagId;
             res.ConferenceId = ConferenceId;
             res.TagName = TagName;
  res.CreatedByUserID = CreatedByUserID;
  res.CreatedOnDate = CreatedOnDate;
  res.LastModifiedByUserID = LastModifiedByUserID;
  res.LastModifiedOnDate = LastModifiedOnDate;
            return res;
        }
        #endregion

    }
}


using System.Runtime.Serialization;
using DotNetNuke.ComponentModel.DataAnnotations;

namespace Connect.Conference.Core.Models.Sessions
{

    [TableName("vw_Connect_Conference_Sessions")]
    [PrimaryKey("SessionId", AutoIncrement = true)]
    [DataContract]
    public partial class Session  : SessionBase 
    {

        #region " Private Members "
        #endregion

        #region " Constructors "
        public Session()  : base() 
        {
        }
        #endregion

        #region " Public Properties "
        [DataMember]
        public string LocationName { get; set; }
        [DataMember]
        public string SlotTitle { get; set; }
        [DataMember]
        public string CreatedByUser { get; set; }
        [DataMember]
        public string LastModifiedByUser { get; set; }
        #endregion

        #region " Public Methods "
        public SessionBase GetSessionBase()
        {
            SessionBase res = new SessionBase();
             res.SessionId = SessionId;
             res.ConferenceId = ConferenceId;
             res.LocationId = LocationId;
             res.Level = Level;
             res.Votes = Votes;
             res.Sort = Sort;
             res.Capacity = Capacity;
             res.SlotId = SlotId;
             res.SessionDate = SessionDate;
             res.Title = Title;
             res.SubTitle = SubTitle;
             res.Description = Description;
             res.Status = Status;
            return res;
        }
        #endregion

    }
}

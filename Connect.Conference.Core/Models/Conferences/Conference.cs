
using System.Runtime.Serialization;
using DotNetNuke.ComponentModel.DataAnnotations;

namespace Connect.Conference.Core.Models.Conferences
{

    [TableName("vw_Connect_Conference_Conferences")]
    [PrimaryKey("ConferenceId", AutoIncrement = true)]
    [DataContract]
    [Scope("PortalId")]                
    public partial class Conference  : ConferenceBase 
    {

        #region " Private Members "
        #endregion

        #region " Constructors "
        public Conference()  : base() 
        {
        }
        #endregion

        #region " Public Properties "
        [DataMember]
        public string CreatedByUser { get; set; }
        [DataMember]
        public string LastModifiedByUser { get; set; }
        #endregion

        #region " Public Methods "
        public ConferenceBase GetConferenceBase()
        {
            ConferenceBase res = new ConferenceBase();
             res.ConferenceId = ConferenceId;
             res.PortalId = PortalId;
             res.Name = Name;
             res.Description = Description;
             res.StartDate = StartDate;
             res.EndDate = EndDate;
             res.MaxCapacity = MaxCapacity;
             res.SessionVoting = SessionVoting;
             res.AttendeeRole = AttendeeRole;
             res.SpeakerRole = SpeakerRole;
            return res;
        }
        #endregion

    }
}

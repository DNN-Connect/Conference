
using System.Runtime.Serialization;
using DotNetNuke.ComponentModel.DataAnnotations;

namespace Connect.Conference.Core.Models.SessionTags
{

    [TableName("vw_Connect_Conference_SessionTags")]
    [DataContract]
    public partial class SessionTag  : SessionTagBase 
    {

        #region .ctor
        public SessionTag()  : base() 
        {
        }
        #endregion

        #region Properties
        [DataMember]
        public string Title { get; set; }
        [DataMember]
        public string TagName { get; set; }
        [DataMember]
        public int? Votes { get; set; }
        [DataMember]
        public int ConferenceId { get; set; }
        #endregion

        #region Methods
        public SessionTagBase GetSessionTagBase()
        {
            SessionTagBase res = new SessionTagBase();
             res.SessionId = SessionId;
             res.TagId = TagId;
            return res;
        }
        #endregion

    }
}

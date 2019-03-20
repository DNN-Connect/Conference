using Connect.Conference.Core.Common;
using DotNetNuke.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace Connect.Conference.Core.Models.SessionTags
{

    [TableName("vw_Connect_Conference_SessionTags")]
    [DataContract]
    public partial class SessionTag : SessionTagBase
    {

        #region .ctor
        public SessionTag() : base()
        {
        }
        #endregion

        #region Properties
        [DataMember]
        [WebApiSecurity(WebApiSecurityLevel.Private)]
        public string Title { get; set; }
        [DataMember]
        public string TagName { get; set; }
        [DataMember]
        [WebApiSecurity(WebApiSecurityLevel.Private)]
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
        public SessionTag Clone()
        {
            SessionTag res = new SessionTag();
            res.SessionId = SessionId;
            res.TagId = TagId;
            res.Title = Title;
            res.TagName = TagName;
            res.ConferenceId = ConferenceId;
            return res;
        }
        #endregion

    }
}

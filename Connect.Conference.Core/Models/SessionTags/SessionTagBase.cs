using Connect.Conference.Core.Common;
using DotNetNuke.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace Connect.Conference.Core.Models.SessionTags
{
    [TableName("Connect_Conference_SessionTags")]
    [DataContract]
    public partial class SessionTagBase
    {

        #region .ctor
        public SessionTagBase()
        {
        }
        #endregion

        #region Properties
        [DataMember]
        [WebApiSecurity(WebApiSecurityLevel.Management)]
        public int SessionId { get; set; }
        [DataMember]
        public int TagId { get; set; }
        #endregion

        #region Methods
        public void ReadSessionTagBase(SessionTagBase sessionTag)
        {
            if (sessionTag.SessionId > -1)
            {
                SessionId = sessionTag.SessionId;
            }

            if (sessionTag.TagId > -1)
            {
                TagId = sessionTag.TagId;
            }
        }
        #endregion

    }
}




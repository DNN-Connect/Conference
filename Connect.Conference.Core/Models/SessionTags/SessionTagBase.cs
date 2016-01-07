
using System;
using System.Runtime.Serialization;
using DotNetNuke.ComponentModel.DataAnnotations;
using Connect.Conference.Core.Common;
using Connect.Conference.Core.Data;

namespace Connect.Conference.Core.Models.SessionTags
{
    [TableName("Connect_Conference_SessionTags")]
    [DataContract]
    public partial class SessionTagBase     {

        #region .ctor
        public SessionTagBase()
        {
        }
        #endregion

        #region Properties
        [DataMember]
        public int SessionId { get; set; }
        [DataMember]
        public int TagId { get; set; }
        #endregion

        #region Methods
        public void ReadSessionTagBase(SessionTagBase sessionTag)
        {
            if (sessionTag.SessionId > -1)
                SessionId = sessionTag.SessionId;

            if (sessionTag.TagId > -1)
                TagId = sessionTag.TagId;

        }
        #endregion

    }
}




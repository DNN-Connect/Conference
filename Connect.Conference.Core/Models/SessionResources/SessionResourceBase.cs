
using System;
using System.Runtime.Serialization;
using DotNetNuke.ComponentModel.DataAnnotations;
using Connect.Conference.Core.Common;
using Connect.Conference.Core.Data;

namespace Connect.Conference.Core.Models.SessionResources
{
    [TableName("Connect_Conference_SessionResources")]
    [PrimaryKey("SessionResourceId", AutoIncrement = true)]
    [DataContract]
    [Scope("SessionId")]
    public partial class SessionResourceBase  : AuditableEntity 
    {

        #region .ctor
        public SessionResourceBase()
        {
            SessionResourceId = -1;
        }
        #endregion

        #region Properties
        [DataMember]
        public int SessionResourceId { get; set; }
        [DataMember]
        public int SessionId { get; set; }
        [DataMember]
        public string ResourceLink { get; set; }
        [DataMember]
        public string ResourceDescription { get; set; }
        [DataMember]
        public int ResourceType { get; set; }
        [DataMember]
        public int Visibility { get; set; }
        #endregion

        #region Methods
        public void ReadSessionResourceBase(SessionResourceBase sessionResource)
        {
            if (sessionResource.SessionResourceId > -1)
                SessionResourceId = sessionResource.SessionResourceId;

            if (sessionResource.SessionId > -1)
                SessionId = sessionResource.SessionId;

            if (!String.IsNullOrEmpty(sessionResource.ResourceLink))
                ResourceLink = sessionResource.ResourceLink;

            if (!String.IsNullOrEmpty(sessionResource.ResourceDescription))
                ResourceDescription = sessionResource.ResourceDescription;

            if (sessionResource.ResourceType > -1)
                ResourceType = sessionResource.ResourceType;

            if (sessionResource.Visibility > -1)
                Visibility = sessionResource.Visibility;

        }
        #endregion

    }
}




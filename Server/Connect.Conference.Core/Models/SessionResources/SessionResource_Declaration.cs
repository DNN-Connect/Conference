
using System;
using System.Runtime.Serialization;
using DotNetNuke.ComponentModel.DataAnnotations;

namespace Connect.Conference.Core.Models.SessionResources
{

    [TableName("vw_Connect_Conference_SessionResources")]
    [PrimaryKey("SessionResourceId", AutoIncrement = true)]
    [DataContract]
    [Scope("SessionId")]
    public partial class SessionResource  : SessionResourceBase 
    {

        #region .ctor
        public SessionResource()  : base() 
        {
        }
        #endregion

        #region Properties
        [DataMember]
        public string CreatedByUser { get; set; }
        [DataMember]
        public string LastModifiedByUser { get; set; }
        #endregion

        #region Methods
        public SessionResourceBase GetSessionResourceBase()
        {
            SessionResourceBase res = new SessionResourceBase();
             res.SessionResourceId = SessionResourceId;
             res.SessionId = SessionId;
             res.ResourceLink = ResourceLink;
             res.ResourceDescription = ResourceDescription;
             res.ResourceType = ResourceType;
             res.Visibility = Visibility;
  res.CreatedByUserID = CreatedByUserID;
  res.CreatedOnDate = CreatedOnDate;
  res.LastModifiedByUserID = LastModifiedByUserID;
  res.LastModifiedOnDate = LastModifiedOnDate;
            return res;
        }
        public SessionResource Clone()
        {
            SessionResource res = new SessionResource();
            res.SessionResourceId = SessionResourceId;
            res.SessionId = SessionId;
            res.ResourceLink = ResourceLink;
            res.ResourceDescription = ResourceDescription;
            res.ResourceType = ResourceType;
            res.Visibility = Visibility;
            res.CreatedByUser = CreatedByUser;
            res.LastModifiedByUser = LastModifiedByUser;
            res.CreatedByUserID = CreatedByUserID;
            res.CreatedOnDate = CreatedOnDate;
            res.LastModifiedByUserID = LastModifiedByUserID;
            res.LastModifiedOnDate = LastModifiedOnDate;
            return res;
        }
        #endregion

    }
}

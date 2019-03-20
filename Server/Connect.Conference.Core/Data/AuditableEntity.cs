using System;
using System.Data;
using System.Runtime.Serialization;
using Connect.Conference.Core.Common;
using DotNetNuke.Common.Utilities;

namespace Connect.Conference.Core.Data
{
    [DataContract]
    public abstract class AuditableEntity
    {

        public void FillAuditFields(IDataReader dr)
        {
            CreatedByUserID = Convert.ToInt32(Null.SetNull(dr["CreatedByUserID"], CreatedByUserID));
            CreatedOnDate = Convert.ToDateTime(Null.SetNull(dr["CreatedOnDate"], CreatedOnDate));
            LastModifiedByUserID = Convert.ToInt32(Null.SetNull(dr["LastModifiedByUserID"], LastModifiedByUserID));
            LastModifiedOnDate = Convert.ToDateTime(Null.SetNull(dr["LastModifiedOnDate"], LastModifiedOnDate));
        }

        public void SetAddingUser(int userId)
        {
            CreatedByUserID = userId;
            CreatedOnDate = DateTime.Now;
            SetModifyingUser(userId);
        }

        public void SetModifyingUser(int userId)
        {
            LastModifiedByUserID = userId;
            LastModifiedOnDate = DateTime.Now;
        }

        #region Public Properties
        [DataMember]
        [WebApiSecurity(WebApiSecurityLevel.Private)]
        public int CreatedByUserID { get; set; }
        [DataMember]
        [WebApiSecurity(WebApiSecurityLevel.Private)]
        public DateTime CreatedOnDate { get; set; }
        [DataMember]
        [WebApiSecurity(WebApiSecurityLevel.Private)]
        public int LastModifiedByUserID { get; set; }
        [DataMember]
        [WebApiSecurity(WebApiSecurityLevel.Private)]
        public DateTime LastModifiedOnDate { get; set; }
        #endregion

    }
}


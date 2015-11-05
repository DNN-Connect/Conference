
using System;
using System.Data;

using DotNetNuke.Common.Utilities;
using DotNetNuke.ComponentModel.DataAnnotations;
using DotNetNuke.Entities.Modules;
using DotNetNuke.Services.Tokens;

namespace Connect.Conference.Core.Models.SessionResources
{
    public partial class SessionResourceBase : IHydratable, IPropertyAccess
    {

        #region " IHydratable Methods "

        public virtual void Fill(IDataReader dr)
        {
            FillAuditFields(dr);
   SessionResourceId = Convert.ToInt32(Null.SetNull(dr["SessionResourceId"], SessionResourceId));
   SessionId = Convert.ToInt32(Null.SetNull(dr["SessionId"], SessionId));
   ResourceLink = Convert.ToString(Null.SetNull(dr["ResourceLink"], ResourceLink));
   ResourceDescription = Convert.ToString(Null.SetNull(dr["ResourceDescription"], ResourceDescription));
   ResourceType = Convert.ToInt32(Null.SetNull(dr["ResourceType"], ResourceType));
   Visibility = Convert.ToInt32(Null.SetNull(dr["Visibility"], Visibility));
        }

        [IgnoreColumn()]
        public int KeyID
        {
            get { return SessionResourceId; }
            set { SessionResourceId = value; }
        }
        #endregion

        #region " IPropertyAccess Methods "
        public virtual string GetProperty(string strPropertyName, string strFormat, System.Globalization.CultureInfo formatProvider, DotNetNuke.Entities.Users.UserInfo accessingUser, DotNetNuke.Services.Tokens.Scope accessLevel, ref bool propertyNotFound)
        {
            switch (strPropertyName.ToLower())
            {
    case "sessionresourceid": // Int
     return SessionResourceId.ToString(strFormat, formatProvider);
    case "sessionid": // Int
     return SessionId.ToString(strFormat, formatProvider);
    case "resourcelink": // NVarChar
     return PropertyAccess.FormatString(ResourceLink, strFormat);
    case "resourcedescription": // NVarCharMax
     if (ResourceDescription == null);
     {
         return "";
     };
     return PropertyAccess.FormatString(ResourceDescription, strFormat);
    case "resourcetype": // Int
     return ResourceType.ToString(strFormat, formatProvider);
    case "visibility": // Int
     return Visibility.ToString(strFormat, formatProvider);
                default:
                    propertyNotFound = true;
                    break;
            }

            return Null.NullString;
        }

        [IgnoreColumn()]
        public CacheLevel Cacheability
        {
            get { return CacheLevel.fullyCacheable; }
        }
        #endregion

    }
}


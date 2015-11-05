
using System;
using System.Data;

using DotNetNuke.Common.Utilities;
using DotNetNuke.ComponentModel.DataAnnotations;
using DotNetNuke.Entities.Modules;
using DotNetNuke.Services.Tokens;

namespace Connect.Conference.Core.Models.SessionAttendees
{
    public partial class SessionAttendeeBase : IHydratable, IPropertyAccess
    {

        #region " IHydratable Methods "

        public virtual void Fill(IDataReader dr)
        {
            FillAuditFields(dr);
   SessionId = Convert.ToInt32(Null.SetNull(dr["SessionId"], SessionId));
   UserId = Convert.ToInt32(Null.SetNull(dr["UserId"], UserId));
        }

        [IgnoreColumn()]
        public int KeyID
        {
            get { return Null.NullInteger; }
            set { }
        }
        #endregion

        #region " IPropertyAccess Methods "
        public virtual string GetProperty(string strPropertyName, string strFormat, System.Globalization.CultureInfo formatProvider, DotNetNuke.Entities.Users.UserInfo accessingUser, DotNetNuke.Services.Tokens.Scope accessLevel, ref bool propertyNotFound)
        {
            switch (strPropertyName.ToLower())
            {
    case "sessionid": // Int
     return SessionId.ToString(strFormat, formatProvider);
    case "userid": // Int
     return UserId.ToString(strFormat, formatProvider);
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


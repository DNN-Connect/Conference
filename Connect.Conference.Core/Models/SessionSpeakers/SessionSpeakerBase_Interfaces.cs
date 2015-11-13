
using System;
using System.Data;

using DotNetNuke.Common.Utilities;
using DotNetNuke.ComponentModel.DataAnnotations;
using DotNetNuke.Entities.Modules;
using DotNetNuke.Services.Tokens;

namespace Connect.Conference.Core.Models.SessionSpeakers
{
    public partial class SessionSpeakerBase : IHydratable, IPropertyAccess
    {

        #region IHydratable

        public virtual void Fill(IDataReader dr)
        {
            FillAuditFields(dr);
   SpeakerId = Convert.ToInt32(Null.SetNull(dr["SpeakerId"], SpeakerId));
   SessionId = Convert.ToInt32(Null.SetNull(dr["SessionId"], SessionId));
   Sort = Convert.ToInt32(Null.SetNull(dr["Sort"], Sort));
        }

        [IgnoreColumn()]
        public int KeyID
        {
            get { return Null.NullInteger; }
            set { }
        }
        #endregion

        #region IPropertyAccess
        public virtual string GetProperty(string strPropertyName, string strFormat, System.Globalization.CultureInfo formatProvider, DotNetNuke.Entities.Users.UserInfo accessingUser, DotNetNuke.Services.Tokens.Scope accessLevel, ref bool propertyNotFound)
        {
            switch (strPropertyName.ToLower())
            {
    case "speakerid": // Int
     return SpeakerId.ToString(strFormat, formatProvider);
    case "sessionid": // Int
     return SessionId.ToString(strFormat, formatProvider);
    case "sort": // Int
     if (Sort == null);
     {
         return "";
     };
     return ((int)Sort).ToString(strFormat, formatProvider);
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


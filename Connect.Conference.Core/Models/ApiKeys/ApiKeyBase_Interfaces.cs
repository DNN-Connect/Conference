
using System;
using System.Data;

using DotNetNuke.Common.Utilities;
using DotNetNuke.ComponentModel.DataAnnotations;
using DotNetNuke.Entities.Modules;
using DotNetNuke.Services.Tokens;

namespace Connect.Conference.Core.Models.ApiKeys
{
    public partial class ApiKeyBase : IHydratable, IPropertyAccess
    {

        #region IHydratable

        public virtual void Fill(IDataReader dr)
        {
   ApiKey = Convert.ToString(Null.SetNull(dr["ApiKey"], ApiKey));
   Expires = (DateTime)(Null.SetNull(dr["Expires"], Expires));
   CreatedByUserID = Convert.ToInt32(Null.SetNull(dr["CreatedByUserID"], CreatedByUserID));
   CreatedOnDate = (DateTime)(Null.SetNull(dr["CreatedOnDate"], CreatedOnDate));
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
    case "apikey": // VarChar
     return PropertyAccess.FormatString(ApiKey, strFormat);
    case "expires": // DateTime
     if (Expires == null)
     {
         return "";
     };
     return ((DateTime)Expires).ToString(strFormat, formatProvider);
    case "createdbyuserid": // Int
     return CreatedByUserID.ToString(strFormat, formatProvider);
    case "createdondate": // DateTime
     return CreatedOnDate.ToString(strFormat, formatProvider);
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


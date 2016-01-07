
using System;
using System.Data;

using DotNetNuke.Common.Utilities;
using DotNetNuke.ComponentModel.DataAnnotations;
using DotNetNuke.Entities.Modules;
using DotNetNuke.Services.Tokens;

namespace Connect.Conference.Core.Models.Tags
{
    public partial class TagBase : IHydratable, IPropertyAccess
    {

        #region IHydratable

        public virtual void Fill(IDataReader dr)
        {
            FillAuditFields(dr);
   TagId = Convert.ToInt32(Null.SetNull(dr["TagId"], TagId));
   ConferenceId = Convert.ToInt32(Null.SetNull(dr["ConferenceId"], ConferenceId));
   TagName = Convert.ToString(Null.SetNull(dr["TagName"], TagName));
   Votes = Convert.ToInt32(Null.SetNull(dr["Votes"], Votes));
        }

        [IgnoreColumn()]
        public int KeyID
        {
            get { return TagId; }
            set { TagId = value; }
        }
        #endregion

        #region IPropertyAccess
        public virtual string GetProperty(string strPropertyName, string strFormat, System.Globalization.CultureInfo formatProvider, DotNetNuke.Entities.Users.UserInfo accessingUser, DotNetNuke.Services.Tokens.Scope accessLevel, ref bool propertyNotFound)
        {
            switch (strPropertyName.ToLower())
            {
    case "tagid": // Int
     return TagId.ToString(strFormat, formatProvider);
    case "conferenceid": // Int
     return ConferenceId.ToString(strFormat, formatProvider);
    case "tagname": // NVarChar
     return PropertyAccess.FormatString(TagName, strFormat);
    case "votes": // Int
     if (Votes == null)
     {
         return "";
     };
     return ((int)Votes).ToString(strFormat, formatProvider);
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


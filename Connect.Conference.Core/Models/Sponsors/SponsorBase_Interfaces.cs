
using System;
using System.Data;

using DotNetNuke.Common.Utilities;
using DotNetNuke.ComponentModel.DataAnnotations;
using DotNetNuke.Entities.Modules;
using DotNetNuke.Services.Tokens;

namespace Connect.Conference.Core.Models.Sponsors
{
    public partial class SponsorBase : IHydratable, IPropertyAccess
    {

        #region IHydratable

        public virtual void Fill(IDataReader dr)
        {
            FillAuditFields(dr);
   SponsorId = Convert.ToInt32(Null.SetNull(dr["SponsorId"], SponsorId));
   ConferenceId = Convert.ToInt32(Null.SetNull(dr["ConferenceId"], ConferenceId));
   Name = Convert.ToString(Null.SetNull(dr["Name"], Name));
   Url = Convert.ToString(Null.SetNull(dr["Url"], Url));
   Description = Convert.ToString(Null.SetNull(dr["Description"], Description));
   ViewOrder = Convert.ToInt32(Null.SetNull(dr["ViewOrder"], ViewOrder));
   SponsorLevel = Convert.ToString(Null.SetNull(dr["SponsorLevel"], SponsorLevel));
        }

        [IgnoreColumn()]
        public int KeyID
        {
            get { return SponsorId; }
            set { SponsorId = value; }
        }
        #endregion

        #region IPropertyAccess
        public virtual string GetProperty(string strPropertyName, string strFormat, System.Globalization.CultureInfo formatProvider, DotNetNuke.Entities.Users.UserInfo accessingUser, DotNetNuke.Services.Tokens.Scope accessLevel, ref bool propertyNotFound)
        {
            switch (strPropertyName.ToLower())
            {
    case "sponsorid": // Int
     return SponsorId.ToString(strFormat, formatProvider);
    case "conferenceid": // Int
     return ConferenceId.ToString(strFormat, formatProvider);
    case "name": // NVarChar
     return PropertyAccess.FormatString(Name, strFormat);
    case "url": // VarChar
     if (Url == null)
     {
         return "";
     };
     return PropertyAccess.FormatString(Url, strFormat);
    case "description": // NVarCharMax
     if (Description == null)
     {
         return "";
     };
     return PropertyAccess.FormatString(Description, strFormat);
    case "vieworder": // Int
     return ViewOrder.ToString(strFormat, formatProvider);
    case "sponsorlevel": // NVarChar
     if (SponsorLevel == null)
     {
         return "";
     };
     return PropertyAccess.FormatString(SponsorLevel, strFormat);
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


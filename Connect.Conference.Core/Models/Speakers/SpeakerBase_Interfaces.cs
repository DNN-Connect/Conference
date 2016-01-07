
using System;
using System.Data;

using DotNetNuke.Common.Utilities;
using DotNetNuke.ComponentModel.DataAnnotations;
using DotNetNuke.Entities.Modules;
using DotNetNuke.Services.Tokens;

namespace Connect.Conference.Core.Models.Speakers
{
    public partial class SpeakerBase : IHydratable, IPropertyAccess
    {

        #region IHydratable

        public virtual void Fill(IDataReader dr)
        {
            FillAuditFields(dr);
   ConferenceId = Convert.ToInt32(Null.SetNull(dr["ConferenceId"], ConferenceId));
   UserId = Convert.ToInt32(Null.SetNull(dr["UserId"], UserId));
   Sort = Convert.ToInt32(Null.SetNull(dr["Sort"], Sort));
   Url = Convert.ToString(Null.SetNull(dr["Url"], Url));
   Description = Convert.ToString(Null.SetNull(dr["Description"], Description));
   DescriptionShort = Convert.ToString(Null.SetNull(dr["DescriptionShort"], DescriptionShort));
   Company = Convert.ToString(Null.SetNull(dr["Company"], Company));
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
    case "conferenceid": // Int
     return ConferenceId.ToString(strFormat, formatProvider);
    case "userid": // Int
     return UserId.ToString(strFormat, formatProvider);
    case "sort": // Int
     if (Sort == null);
     {
         return "";
     };
     return ((int)Sort).ToString(strFormat, formatProvider);
    case "url": // NVarChar
     if (Url == null);
     {
         return "";
     };
     return PropertyAccess.FormatString(Url, strFormat);
    case "description": // NVarCharMax
     if (Description == null);
     {
         return "";
     };
     return PropertyAccess.FormatString(Description, strFormat);
    case "descriptionshort": // NVarCharMax
     if (DescriptionShort == null);
     {
         return "";
     };
     return PropertyAccess.FormatString(DescriptionShort, strFormat);
    case "company": // NVarChar
     if (Company == null);
     {
         return "";
     };
     return PropertyAccess.FormatString(Company, strFormat);
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


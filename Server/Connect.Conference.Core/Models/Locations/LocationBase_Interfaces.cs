
using System;
using System.Data;

using DotNetNuke.Common.Utilities;
using DotNetNuke.ComponentModel.DataAnnotations;
using DotNetNuke.Entities.Modules;
using DotNetNuke.Services.Tokens;

namespace Connect.Conference.Core.Models.Locations
{
    public partial class LocationBase : IHydratable, IPropertyAccess
    {

        #region IHydratable

        public virtual void Fill(IDataReader dr)
        {
            FillAuditFields(dr);
   LocationId = Convert.ToInt32(Null.SetNull(dr["LocationId"], LocationId));
   ConferenceId = Convert.ToInt32(Null.SetNull(dr["ConferenceId"], ConferenceId));
   Name = Convert.ToString(Null.SetNull(dr["Name"], Name));
   Description = Convert.ToString(Null.SetNull(dr["Description"], Description));
   Capacity = Convert.ToInt32(Null.SetNull(dr["Capacity"], Capacity));
   Sort = Convert.ToInt32(Null.SetNull(dr["Sort"], Sort));
   BackgroundColor = Convert.ToString(Null.SetNull(dr["BackgroundColor"], BackgroundColor));
        }

        [IgnoreColumn()]
        public int KeyID
        {
            get { return LocationId; }
            set { LocationId = value; }
        }
        #endregion

        #region IPropertyAccess
        public virtual string GetProperty(string strPropertyName, string strFormat, System.Globalization.CultureInfo formatProvider, DotNetNuke.Entities.Users.UserInfo accessingUser, DotNetNuke.Services.Tokens.Scope accessLevel, ref bool propertyNotFound)
        {
            switch (strPropertyName.ToLower())
            {
    case "locationid": // Int
     return LocationId.ToString(strFormat, formatProvider);
    case "conferenceid": // Int
     return ConferenceId.ToString(strFormat, formatProvider);
    case "name": // NVarChar
     if (Name == null)
     {
         return "";
     };
     return PropertyAccess.FormatString(Name, strFormat);
    case "description": // NVarCharMax
     if (Description == null)
     {
         return "";
     };
     return PropertyAccess.FormatString(Description, strFormat);
    case "capacity": // Int
     if (Capacity == null)
     {
         return "";
     };
     return ((int)Capacity).ToString(strFormat, formatProvider);
    case "sort": // Int
     if (Sort == null)
     {
         return "";
     };
     return ((int)Sort).ToString(strFormat, formatProvider);
    case "backgroundcolor": // NVarChar
     if (BackgroundColor == null)
     {
         return "";
     };
     return PropertyAccess.FormatString(BackgroundColor, strFormat);
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


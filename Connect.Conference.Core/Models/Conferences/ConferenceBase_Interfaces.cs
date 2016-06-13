
using System;
using System.Data;

using DotNetNuke.Common.Utilities;
using DotNetNuke.ComponentModel.DataAnnotations;
using DotNetNuke.Entities.Modules;
using DotNetNuke.Services.Tokens;

namespace Connect.Conference.Core.Models.Conferences
{
    public partial class ConferenceBase : IHydratable, IPropertyAccess
    {

        #region IHydratable

        public virtual void Fill(IDataReader dr)
        {
            FillAuditFields(dr);
   ConferenceId = Convert.ToInt32(Null.SetNull(dr["ConferenceId"], ConferenceId));
   PortalId = Convert.ToInt32(Null.SetNull(dr["PortalId"], PortalId));
   Name = Convert.ToString(Null.SetNull(dr["Name"], Name));
   Description = Convert.ToString(Null.SetNull(dr["Description"], Description));
   StartDate = (DateTime)(Null.SetNull(dr["StartDate"], StartDate));
   EndDate = (DateTime)(Null.SetNull(dr["EndDate"], EndDate));
   MaxCapacity = Convert.ToInt32(Null.SetNull(dr["MaxCapacity"], MaxCapacity));
   SessionVoting = Convert.ToBoolean(Null.SetNull(dr["SessionVoting"], SessionVoting));
   AttendeeRole = Convert.ToInt32(Null.SetNull(dr["AttendeeRole"], AttendeeRole));
   SpeakerRole = Convert.ToInt32(Null.SetNull(dr["SpeakerRole"], SpeakerRole));
   Location = Convert.ToString(Null.SetNull(dr["Location"], Location));
   Url = Convert.ToString(Null.SetNull(dr["Url"], Url));
   SubmittedSessionsPublic = Convert.ToBoolean(Null.SetNull(dr["SubmittedSessionsPublic"], SubmittedSessionsPublic));
   TimeZoneId = Convert.ToString(Null.SetNull(dr["TimeZoneId"], TimeZoneId));
        }

        [IgnoreColumn()]
        public int KeyID
        {
            get { return ConferenceId; }
            set { ConferenceId = value; }
        }
        #endregion

        #region IPropertyAccess
        public virtual string GetProperty(string strPropertyName, string strFormat, System.Globalization.CultureInfo formatProvider, DotNetNuke.Entities.Users.UserInfo accessingUser, DotNetNuke.Services.Tokens.Scope accessLevel, ref bool propertyNotFound)
        {
            switch (strPropertyName.ToLower())
            {
    case "conferenceid": // Int
     return ConferenceId.ToString(strFormat, formatProvider);
    case "portalid": // Int
     return PortalId.ToString(strFormat, formatProvider);
    case "name": // NVarChar
     return PropertyAccess.FormatString(Name, strFormat);
    case "description": // NVarCharMax
     if (Description == null)
     {
         return "";
     };
     return PropertyAccess.FormatString(Description, strFormat);
    case "startdate": // DateTime
     if (StartDate == null)
     {
         return "";
     };
     return ((DateTime)StartDate).ToString(strFormat, formatProvider);
    case "enddate": // DateTime
     if (EndDate == null)
     {
         return "";
     };
     return ((DateTime)EndDate).ToString(strFormat, formatProvider);
    case "maxcapacity": // Int
     if (MaxCapacity == null)
     {
         return "";
     };
     return ((int)MaxCapacity).ToString(strFormat, formatProvider);
    case "sessionvoting": // Bit
     return SessionVoting.ToString();
    case "attendeerole": // Int
     return AttendeeRole.ToString(strFormat, formatProvider);
    case "speakerrole": // Int
     return SpeakerRole.ToString(strFormat, formatProvider);
    case "location": // NVarChar
     if (Location == null)
     {
         return "";
     };
     return PropertyAccess.FormatString(Location, strFormat);
    case "url": // NVarChar
     if (Url == null)
     {
         return "";
     };
     return PropertyAccess.FormatString(Url, strFormat);
    case "submittedsessionspublic": // Bit
     return SubmittedSessionsPublic.ToString();
    case "timezoneid": // VarChar
     if (TimeZoneId == null)
     {
         return "";
     };
     return PropertyAccess.FormatString(TimeZoneId, strFormat);
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


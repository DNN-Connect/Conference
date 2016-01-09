
using System;
using System.Data;

using DotNetNuke.Common.Utilities;
using DotNetNuke.ComponentModel.DataAnnotations;
using DotNetNuke.Entities.Modules;
using DotNetNuke.Services.Tokens;

namespace Connect.Conference.Core.Models.Sessions
{
    public partial class SessionBase : IHydratable, IPropertyAccess
    {

        #region IHydratable

        public virtual void Fill(IDataReader dr)
        {
            FillAuditFields(dr);
   SessionId = Convert.ToInt32(Null.SetNull(dr["SessionId"], SessionId));
   ConferenceId = Convert.ToInt32(Null.SetNull(dr["ConferenceId"], ConferenceId));
   LocationId = Convert.ToInt32(Null.SetNull(dr["LocationId"], LocationId));
   Level = Convert.ToString(Null.SetNull(dr["Level"], Level));
   Sort = Convert.ToInt32(Null.SetNull(dr["Sort"], Sort));
   Capacity = Convert.ToInt32(Null.SetNull(dr["Capacity"], Capacity));
   SlotId = Convert.ToInt32(Null.SetNull(dr["SlotId"], SlotId));
   Title = Convert.ToString(Null.SetNull(dr["Title"], Title));
   SubTitle = Convert.ToString(Null.SetNull(dr["SubTitle"], SubTitle));
   Description = Convert.ToString(Null.SetNull(dr["Description"], Description));
   Status = Convert.ToInt32(Null.SetNull(dr["Status"], Status));
   IsPlenary = Convert.ToBoolean(Null.SetNull(dr["IsPlenary"], IsPlenary));
   DayNr = Convert.ToInt32(Null.SetNull(dr["DayNr"], DayNr));
   Notes = Convert.ToString(Null.SetNull(dr["Notes"], Notes));
        }

        [IgnoreColumn()]
        public int KeyID
        {
            get { return SessionId; }
            set { SessionId = value; }
        }
        #endregion

        #region IPropertyAccess
        public virtual string GetProperty(string strPropertyName, string strFormat, System.Globalization.CultureInfo formatProvider, DotNetNuke.Entities.Users.UserInfo accessingUser, DotNetNuke.Services.Tokens.Scope accessLevel, ref bool propertyNotFound)
        {
            switch (strPropertyName.ToLower())
            {
    case "sessionid": // Int
     return SessionId.ToString(strFormat, formatProvider);
    case "conferenceid": // Int
     return ConferenceId.ToString(strFormat, formatProvider);
    case "locationid": // Int
     if (LocationId == null)
     {
         return "";
     };
     return ((int)LocationId).ToString(strFormat, formatProvider);
    case "level": // NVarChar
     if (Level == null)
     {
         return "";
     };
     return PropertyAccess.FormatString(Level, strFormat);
    case "sort": // Int
     if (Sort == null)
     {
         return "";
     };
     return ((int)Sort).ToString(strFormat, formatProvider);
    case "capacity": // Int
     if (Capacity == null)
     {
         return "";
     };
     return ((int)Capacity).ToString(strFormat, formatProvider);
    case "slotid": // Int
     return SlotId.ToString(strFormat, formatProvider);
    case "title": // NVarChar
     if (Title == null)
     {
         return "";
     };
     return PropertyAccess.FormatString(Title, strFormat);
    case "subtitle": // NVarChar
     if (SubTitle == null)
     {
         return "";
     };
     return PropertyAccess.FormatString(SubTitle, strFormat);
    case "description": // NVarCharMax
     if (Description == null)
     {
         return "";
     };
     return PropertyAccess.FormatString(Description, strFormat);
    case "status": // Int
     if (Status == null)
     {
         return "";
     };
     return ((int)Status).ToString(strFormat, formatProvider);
    case "isplenary": // Bit
     return IsPlenary.ToString();
    case "daynr": // Int
     return DayNr.ToString(strFormat, formatProvider);
    case "notes": // NVarCharMax
     if (Notes == null)
     {
         return "";
     };
     return PropertyAccess.FormatString(Notes, strFormat);
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


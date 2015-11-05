
using System;
using System.Data;

using DotNetNuke.Common.Utilities;
using DotNetNuke.ComponentModel.DataAnnotations;
using DotNetNuke.Entities.Modules;
using DotNetNuke.Services.Tokens;

namespace Connect.Conference.Core.Models.Slots
{
    public partial class SlotBase : IHydratable, IPropertyAccess
    {

        #region " IHydratable Methods "

        public virtual void Fill(IDataReader dr)
        {
            FillAuditFields(dr);
   SlotId = Convert.ToInt32(Null.SetNull(dr["SlotId"], SlotId));
   ConferenceId = Convert.ToInt32(Null.SetNull(dr["ConferenceId"], ConferenceId));
   Start = Convert.ToDateTime(Null.SetNull(dr["Start"], Start));
   DurationMins = Convert.ToInt32(Null.SetNull(dr["DurationMins"], DurationMins));
   SlotType = Convert.ToInt32(Null.SetNull(dr["SlotType"], SlotType));
   Title = Convert.ToString(Null.SetNull(dr["Title"], Title));
   Description = Convert.ToString(Null.SetNull(dr["Description"], Description));
        }

        [IgnoreColumn()]
        public int KeyID
        {
            get { return SlotId; }
            set { SlotId = value; }
        }
        #endregion

        #region " IPropertyAccess Methods "
        public virtual string GetProperty(string strPropertyName, string strFormat, System.Globalization.CultureInfo formatProvider, DotNetNuke.Entities.Users.UserInfo accessingUser, DotNetNuke.Services.Tokens.Scope accessLevel, ref bool propertyNotFound)
        {
            switch (strPropertyName.ToLower())
            {
    case "slotid": // Int
     return SlotId.ToString(strFormat, formatProvider);
    case "conferenceid": // Int
     return ConferenceId.ToString(strFormat, formatProvider);
    case "start": // Time
     return Start.ToString(strFormat, formatProvider);
    case "durationmins": // Int
     return DurationMins.ToString(strFormat, formatProvider);
    case "slottype": // Int
     return SlotType.ToString(strFormat, formatProvider);
    case "title": // NVarChar
     if (Title == null);
     {
         return "";
     };
     return PropertyAccess.FormatString(Title, strFormat);
    case "description": // NVarCharMax
     if (Description == null);
     {
         return "";
     };
     return PropertyAccess.FormatString(Description, strFormat);
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


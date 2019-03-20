
using System;
using System.Data;

using DotNetNuke.Common.Utilities;
using DotNetNuke.ComponentModel.DataAnnotations;
using DotNetNuke.Entities.Modules;
using DotNetNuke.Services.Tokens;

namespace Connect.Conference.Core.Models.Attendees
{
    public partial class AttendeeBase : IHydratable, IPropertyAccess
    {

        #region IHydratable

        public virtual void Fill(IDataReader dr)
        {
            FillAuditFields(dr);
   ConferenceId = Convert.ToInt32(Null.SetNull(dr["ConferenceId"], ConferenceId));
   UserId = Convert.ToInt32(Null.SetNull(dr["UserId"], UserId));
   Status = Convert.ToInt32(Null.SetNull(dr["Status"], Status));
   ReceiveNotifications = Convert.ToBoolean(Null.SetNull(dr["ReceiveNotifications"], ReceiveNotifications));
   Company = Convert.ToString(Null.SetNull(dr["Company"], Company));
   AttCode = Convert.ToString(Null.SetNull(dr["AttCode"], AttCode));
   NotificationToken = Convert.ToString(Null.SetNull(dr["NotificationToken"], NotificationToken));
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
    case "status": // Int
     return Status.ToString(strFormat, formatProvider);
    case "receivenotifications": // Bit
     return ReceiveNotifications.ToString();
    case "company": // NVarChar
     if (Company == null)
     {
         return "";
     };
     return PropertyAccess.FormatString(Company, strFormat);
    case "attcode": // NVarChar
     if (AttCode == null)
     {
         return "";
     };
     return PropertyAccess.FormatString(AttCode, strFormat);
    case "notificationtoken": // VarChar
     if (NotificationToken == null)
     {
         return "";
     };
     return PropertyAccess.FormatString(NotificationToken, strFormat);
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


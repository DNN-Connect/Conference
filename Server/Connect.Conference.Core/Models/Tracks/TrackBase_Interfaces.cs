
using System;
using System.Data;

using DotNetNuke.Common.Utilities;
using DotNetNuke.ComponentModel.DataAnnotations;
using DotNetNuke.Entities.Modules;
using DotNetNuke.Services.Tokens;

namespace Connect.Conference.Core.Models.Tracks
{
    public partial class TrackBase : IHydratable, IPropertyAccess
    {

        #region IHydratable

        public virtual void Fill(IDataReader dr)
        {
            FillAuditFields(dr);
   TrackId = Convert.ToInt32(Null.SetNull(dr["TrackId"], TrackId));
   ConferenceId = Convert.ToInt32(Null.SetNull(dr["ConferenceId"], ConferenceId));
   SessionVoting = Convert.ToBoolean(Null.SetNull(dr["SessionVoting"], SessionVoting));
   BackgroundColor = Convert.ToString(Null.SetNull(dr["BackgroundColor"], BackgroundColor));
   Sort = Convert.ToInt32(Null.SetNull(dr["Sort"], Sort));
   Title = Convert.ToString(Null.SetNull(dr["Title"], Title));
   Description = Convert.ToString(Null.SetNull(dr["Description"], Description));
        }

        [IgnoreColumn()]
        public int KeyID
        {
            get { return TrackId; }
            set { TrackId = value; }
        }
        #endregion

        #region IPropertyAccess
        public virtual string GetProperty(string strPropertyName, string strFormat, System.Globalization.CultureInfo formatProvider, DotNetNuke.Entities.Users.UserInfo accessingUser, DotNetNuke.Services.Tokens.Scope accessLevel, ref bool propertyNotFound)
        {
            switch (strPropertyName.ToLower())
            {
    case "trackid": // Int
     return TrackId.ToString(strFormat, formatProvider);
    case "conferenceid": // Int
     return ConferenceId.ToString(strFormat, formatProvider);
    case "sessionvoting": // Bit
     return SessionVoting.ToString();
    case "backgroundcolor": // NVarChar
     if (BackgroundColor == null)
     {
         return "";
     };
     return PropertyAccess.FormatString(BackgroundColor, strFormat);
    case "sort": // Int
     if (Sort == null)
     {
         return "";
     };
     return ((int)Sort).ToString(strFormat, formatProvider);
    case "title": // NVarChar
     if (Title == null)
     {
         return "";
     };
     return PropertyAccess.FormatString(Title, strFormat);
    case "description": // NVarCharMax
     if (Description == null)
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


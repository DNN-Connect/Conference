
using System;
using System.Data;

using DotNetNuke.Common.Utilities;
using DotNetNuke.ComponentModel.DataAnnotations;
using DotNetNuke.Entities.Modules;
using DotNetNuke.Services.Tokens;

namespace Connect.Conference.Core.Models.Comments
{
    public partial class CommentBase : IHydratable, IPropertyAccess
    {

        #region IHydratable

        public virtual void Fill(IDataReader dr)
        {
   CommentId = Convert.ToInt32(Null.SetNull(dr["CommentId"], CommentId));
   UserId = Convert.ToInt32(Null.SetNull(dr["UserId"], UserId));
   ConferenceId = Convert.ToInt32(Null.SetNull(dr["ConferenceId"], ConferenceId));
   SessionId = Convert.ToInt32(Null.SetNull(dr["SessionId"], SessionId));
   Datime = (DateTime)(Null.SetNull(dr["Datime"], Datime));
   Remarks = Convert.ToString(Null.SetNull(dr["Remarks"], Remarks));
   Visiblity = Convert.ToInt32(Null.SetNull(dr["Visiblity"], Visiblity));
        }

        [IgnoreColumn()]
        public int KeyID
        {
            get { return CommentId; }
            set { CommentId = value; }
        }
        #endregion

        #region IPropertyAccess
        public virtual string GetProperty(string strPropertyName, string strFormat, System.Globalization.CultureInfo formatProvider, DotNetNuke.Entities.Users.UserInfo accessingUser, DotNetNuke.Services.Tokens.Scope accessLevel, ref bool propertyNotFound)
        {
            switch (strPropertyName.ToLower())
            {
    case "commentid": // Int
     return CommentId.ToString(strFormat, formatProvider);
    case "userid": // Int
     return UserId.ToString(strFormat, formatProvider);
    case "conferenceid": // Int
     return ConferenceId.ToString(strFormat, formatProvider);
    case "sessionid": // Int
     return SessionId.ToString(strFormat, formatProvider);
    case "datime": // DateTime
     return Datime.ToString(strFormat, formatProvider);
    case "remarks": // NVarCharMax
     return PropertyAccess.FormatString(Remarks, strFormat);
    case "visiblity": // Int
     return Visiblity.ToString(strFormat, formatProvider);
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


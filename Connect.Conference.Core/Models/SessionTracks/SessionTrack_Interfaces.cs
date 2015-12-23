
using System;
using System.Data;
using System.Xml.Serialization;

using DotNetNuke.Common.Utilities;
using DotNetNuke.Services.Tokens;

namespace Connect.Conference.Core.Models.SessionTracks
{

 [Serializable(), XmlRoot("SessionTrack")]
 public partial class SessionTrack
 {

  #region IHydratable
  public override void Fill(IDataReader dr)
  {
   base.Fill(dr);
   SessionTitle = Convert.ToString(Null.SetNull(dr["SessionTitle"], SessionTitle));
   TrackTitle = Convert.ToString(Null.SetNull(dr["TrackTitle"], TrackTitle));
   Sort = Convert.ToInt32(Null.SetNull(dr["Sort"], Sort));
   CreatedByUser = Convert.ToString(Null.SetNull(dr["CreatedByUser"], CreatedByUser));
   LastModifiedByUser = Convert.ToString(Null.SetNull(dr["LastModifiedByUser"], LastModifiedByUser));
  }
  #endregion

  #region IPropertyAccess
  public override string GetProperty(string strPropertyName, string strFormat, System.Globalization.CultureInfo formatProvider, DotNetNuke.Entities.Users.UserInfo accessingUser, DotNetNuke.Services.Tokens.Scope accessLevel, ref bool propertyNotFound)
  {
   switch (strPropertyName.ToLower()) {
    case "sessiontitle": // NVarChar
     if (SessionTitle == null);
     {
         return "";
     };
     return PropertyAccess.FormatString(SessionTitle, strFormat);
    case "tracktitle": // NVarChar
     if (TrackTitle == null);
     {
         return "";
     };
     return PropertyAccess.FormatString(TrackTitle, strFormat);
    case "sort": // Int
     if (Sort == null);
     {
         return "";
     };
     return ((int)Sort).ToString(strFormat, formatProvider);
    case "createdbyuser": // NVarChar
     if (CreatedByUser == null);
     {
         return "";
     };
     return PropertyAccess.FormatString(CreatedByUser, strFormat);
    case "lastmodifiedbyuser": // NVarChar
     if (LastModifiedByUser == null);
     {
         return "";
     };
     return PropertyAccess.FormatString(LastModifiedByUser, strFormat);
    default:
       return base.GetProperty(strPropertyName, strFormat, formatProvider, accessingUser, accessLevel, ref propertyNotFound);
   }

         return Null.NullString;
  }
  #endregion

 }
}


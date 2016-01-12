
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
  }
  #endregion

  #region IPropertyAccess
  public override string GetProperty(string strPropertyName, string strFormat, System.Globalization.CultureInfo formatProvider, DotNetNuke.Entities.Users.UserInfo accessingUser, DotNetNuke.Services.Tokens.Scope accessLevel, ref bool propertyNotFound)
  {
   switch (strPropertyName.ToLower()) {
    case "sessiontitle": // NVarChar
     if (SessionTitle == null)
     {
         return "";
     };
     return PropertyAccess.FormatString(SessionTitle, strFormat);
    case "tracktitle": // NVarChar
     if (TrackTitle == null)
     {
         return "";
     };
     return PropertyAccess.FormatString(TrackTitle, strFormat);
    case "sort": // Int
     if (Sort == null)
     {
         return "";
     };
     return ((int)Sort).ToString(strFormat, formatProvider);
    default:
       return base.GetProperty(strPropertyName, strFormat, formatProvider, accessingUser, accessLevel, ref propertyNotFound);
   }
  }
  #endregion

 }
}


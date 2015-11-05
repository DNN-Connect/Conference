
using System;
using System.Data;
using System.Xml.Serialization;

using DotNetNuke.Common.Utilities;
using DotNetNuke.Services.Tokens;

namespace Connect.Conference.Core.Models.SessionAttendees
{

 [Serializable(), XmlRoot("SessionAttendee")]
 public partial class SessionAttendee
 {

  #region " IHydratable Implementation "
  public override void Fill(IDataReader dr)
  {
   base.Fill(dr);
   Title = Convert.ToString(Null.SetNull(dr["Title"], Title));
   SessionAttendeeName = Convert.ToString(Null.SetNull(dr["SessionAttendeeName"], SessionAttendeeName));
   CreatedByUser = Convert.ToString(Null.SetNull(dr["CreatedByUser"], CreatedByUser));
   LastModifiedByUser = Convert.ToString(Null.SetNull(dr["LastModifiedByUser"], LastModifiedByUser));
  }
  #endregion

  #region " IPropertyAccess Implementation "
  public override string GetProperty(string strPropertyName, string strFormat, System.Globalization.CultureInfo formatProvider, DotNetNuke.Entities.Users.UserInfo accessingUser, DotNetNuke.Services.Tokens.Scope accessLevel, ref bool propertyNotFound)
  {
   switch (strPropertyName.ToLower()) {
    case "title": // NVarChar
     if (Title == null);
     {
         return "";
     };
     return PropertyAccess.FormatString(Title, strFormat);
    case "sessionattendeename": // NVarChar
     return PropertyAccess.FormatString(SessionAttendeeName, strFormat);
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


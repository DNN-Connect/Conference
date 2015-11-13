
using System;
using System.Data;
using System.Xml.Serialization;

using DotNetNuke.Common.Utilities;
using DotNetNuke.Services.Tokens;

namespace Connect.Conference.Core.Models.SessionSpeakers
{

 [Serializable(), XmlRoot("SessionSpeaker")]
 public partial class SessionSpeaker
 {

  #region IHydratable
  public override void Fill(IDataReader dr)
  {
   base.Fill(dr);
   DisplayName = Convert.ToString(Null.SetNull(dr["DisplayName"], DisplayName));
   FirstName = Convert.ToString(Null.SetNull(dr["FirstName"], FirstName));
   LastName = Convert.ToString(Null.SetNull(dr["LastName"], LastName));
   Email = Convert.ToString(Null.SetNull(dr["Email"], Email));
   Username = Convert.ToString(Null.SetNull(dr["Username"], Username));
   CreatedByUser = Convert.ToString(Null.SetNull(dr["CreatedByUser"], CreatedByUser));
   LastModifiedByUser = Convert.ToString(Null.SetNull(dr["LastModifiedByUser"], LastModifiedByUser));
  }
  #endregion

  #region IPropertyAccess
  public override string GetProperty(string strPropertyName, string strFormat, System.Globalization.CultureInfo formatProvider, DotNetNuke.Entities.Users.UserInfo accessingUser, DotNetNuke.Services.Tokens.Scope accessLevel, ref bool propertyNotFound)
  {
   switch (strPropertyName.ToLower()) {
    case "displayname": // NVarChar
     return PropertyAccess.FormatString(DisplayName, strFormat);
    case "firstname": // NVarChar
     return PropertyAccess.FormatString(FirstName, strFormat);
    case "lastname": // NVarChar
     return PropertyAccess.FormatString(LastName, strFormat);
    case "email": // NVarChar
     if (Email == null);
     {
         return "";
     };
     return PropertyAccess.FormatString(Email, strFormat);
    case "username": // NVarChar
     return PropertyAccess.FormatString(Username, strFormat);
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


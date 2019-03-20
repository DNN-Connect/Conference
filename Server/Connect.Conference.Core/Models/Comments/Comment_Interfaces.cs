
using System;
using System.Data;
using System.Xml.Serialization;

using DotNetNuke.Common.Utilities;
using DotNetNuke.Services.Tokens;

namespace Connect.Conference.Core.Models.Comments
{

 [Serializable(), XmlRoot("Comment")]
 public partial class Comment
 {

  #region IHydratable
  public override void Fill(IDataReader dr)
  {
   base.Fill(dr);
   DisplayName = Convert.ToString(Null.SetNull(dr["DisplayName"], DisplayName));
   Email = Convert.ToString(Null.SetNull(dr["Email"], Email));
   FirstName = Convert.ToString(Null.SetNull(dr["FirstName"], FirstName));
   LastName = Convert.ToString(Null.SetNull(dr["LastName"], LastName));
   ConferenceName = Convert.ToString(Null.SetNull(dr["ConferenceName"], ConferenceName));
   SessionTitle = Convert.ToString(Null.SetNull(dr["SessionTitle"], SessionTitle));
  }
  #endregion

  #region IPropertyAccess
  public override string GetProperty(string strPropertyName, string strFormat, System.Globalization.CultureInfo formatProvider, DotNetNuke.Entities.Users.UserInfo accessingUser, DotNetNuke.Services.Tokens.Scope accessLevel, ref bool propertyNotFound)
  {
   switch (strPropertyName.ToLower()) {
    case "displayname": // NVarChar
     return PropertyAccess.FormatString(DisplayName, strFormat);
    case "email": // NVarChar
     if (Email == null)
     {
         return "";
     };
     return PropertyAccess.FormatString(Email, strFormat);
    case "firstname": // NVarChar
     return PropertyAccess.FormatString(FirstName, strFormat);
    case "lastname": // NVarChar
     return PropertyAccess.FormatString(LastName, strFormat);
    case "conferencename": // NVarChar
     return PropertyAccess.FormatString(ConferenceName, strFormat);
    case "sessiontitle": // NVarChar
     if (SessionTitle == null)
     {
         return "";
     };
     return PropertyAccess.FormatString(SessionTitle, strFormat);
    default:
       return base.GetProperty(strPropertyName, strFormat, formatProvider, accessingUser, accessLevel, ref propertyNotFound);
   }
  }
  #endregion

 }
}


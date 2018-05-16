
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

  #region IHydratable
  public override void Fill(IDataReader dr)
  {
   base.Fill(dr);
   Title = Convert.ToString(Null.SetNull(dr["Title"], Title));
   ConferenceId = Convert.ToInt32(Null.SetNull(dr["ConferenceId"], ConferenceId));
   SessionDateAndTime = (DateTime)(Null.SetNull(dr["SessionDateAndTime"], SessionDateAndTime));
   SessionEnd = (DateTime)(Null.SetNull(dr["SessionEnd"], SessionEnd));
   DisplayName = Convert.ToString(Null.SetNull(dr["DisplayName"], DisplayName));
   Email = Convert.ToString(Null.SetNull(dr["Email"], Email));
   Company = Convert.ToString(Null.SetNull(dr["Company"], Company));
   AttCode = Convert.ToString(Null.SetNull(dr["AttCode"], AttCode));
   SessionAttendeeName = Convert.ToString(Null.SetNull(dr["SessionAttendeeName"], SessionAttendeeName));
   CreatedByUser = Convert.ToString(Null.SetNull(dr["CreatedByUser"], CreatedByUser));
   LastModifiedByUser = Convert.ToString(Null.SetNull(dr["LastModifiedByUser"], LastModifiedByUser));
  }
  #endregion

  #region IPropertyAccess
  public override string GetProperty(string strPropertyName, string strFormat, System.Globalization.CultureInfo formatProvider, DotNetNuke.Entities.Users.UserInfo accessingUser, DotNetNuke.Services.Tokens.Scope accessLevel, ref bool propertyNotFound)
  {
   switch (strPropertyName.ToLower()) {
    case "title": // NVarChar
     if (Title == null)
     {
         return "";
     };
     return PropertyAccess.FormatString(Title, strFormat);
    case "conferenceid": // Int
     return ConferenceId.ToString(strFormat, formatProvider);
    case "sessiondateandtime": // DateTime
     if (SessionDateAndTime == null)
     {
         return "";
     };
     return ((DateTime)SessionDateAndTime).ToString(strFormat, formatProvider);
    case "sessionend": // DateTime
     if (SessionEnd == null)
     {
         return "";
     };
     return ((DateTime)SessionEnd).ToString(strFormat, formatProvider);
    case "displayname": // NVarChar
     return PropertyAccess.FormatString(DisplayName, strFormat);
    case "email": // NVarChar
     if (Email == null)
     {
         return "";
     };
     return PropertyAccess.FormatString(Email, strFormat);
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
    case "sessionattendeename": // NVarChar
     return PropertyAccess.FormatString(SessionAttendeeName, strFormat);
    case "createdbyuser": // NVarChar
     if (CreatedByUser == null)
     {
         return "";
     };
     return PropertyAccess.FormatString(CreatedByUser, strFormat);
    case "lastmodifiedbyuser": // NVarChar
     if (LastModifiedByUser == null)
     {
         return "";
     };
     return PropertyAccess.FormatString(LastModifiedByUser, strFormat);
    default:
       return base.GetProperty(strPropertyName, strFormat, formatProvider, accessingUser, accessLevel, ref propertyNotFound);
   }
  }
  #endregion

 }
}


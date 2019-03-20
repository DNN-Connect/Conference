
using System;
using System.Data;
using System.Xml.Serialization;

using DotNetNuke.Common.Utilities;
using DotNetNuke.Services.Tokens;

namespace Connect.Conference.Core.Models.Attendees
{

 [Serializable(), XmlRoot("Attendee")]
 public partial class Attendee
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
   PhotoVisibility = Convert.ToInt32(Null.SetNull(dr["PhotoVisibility"], PhotoVisibility));
   PhotoFilename = Convert.ToString(Null.SetNull(dr["PhotoFilename"], PhotoFilename));
   PhotoFolder = Convert.ToString(Null.SetNull(dr["PhotoFolder"], PhotoFolder));
   PhotoWidth = Convert.ToInt32(Null.SetNull(dr["PhotoWidth"], PhotoWidth));
   PhotoHeight = Convert.ToInt32(Null.SetNull(dr["PhotoHeight"], PhotoHeight));
   PhotoContentType = Convert.ToString(Null.SetNull(dr["PhotoContentType"], PhotoContentType));
   Biography = Convert.ToString(Null.SetNull(dr["Biography"], Biography));
   ProfileCompany = Convert.ToString(Null.SetNull(dr["ProfileCompany"], ProfileCompany));
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
     if (Email == null)
     {
         return "";
     };
     return PropertyAccess.FormatString(Email, strFormat);
    case "username": // NVarChar
     return PropertyAccess.FormatString(Username, strFormat);
    case "photovisibility": // Int
     if (PhotoVisibility == null)
     {
         return "";
     };
     return ((int)PhotoVisibility).ToString(strFormat, formatProvider);
    case "photofilename": // NVarChar
     if (PhotoFilename == null)
     {
         return "";
     };
     return PropertyAccess.FormatString(PhotoFilename, strFormat);
    case "photofolder": // NVarChar
     if (PhotoFolder == null)
     {
         return "";
     };
     return PropertyAccess.FormatString(PhotoFolder, strFormat);
    case "photowidth": // Int
     if (PhotoWidth == null)
     {
         return "";
     };
     return ((int)PhotoWidth).ToString(strFormat, formatProvider);
    case "photoheight": // Int
     if (PhotoHeight == null)
     {
         return "";
     };
     return ((int)PhotoHeight).ToString(strFormat, formatProvider);
    case "photocontenttype": // NVarChar
     if (PhotoContentType == null)
     {
         return "";
     };
     return PropertyAccess.FormatString(PhotoContentType, strFormat);
    case "biography": // NVarChar
     if (Biography == null)
     {
         return "";
     };
     return PropertyAccess.FormatString(Biography, strFormat);
    case "profilecompany": // NVarChar
     if (ProfileCompany == null)
     {
         return "";
     };
     return PropertyAccess.FormatString(ProfileCompany, strFormat);
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


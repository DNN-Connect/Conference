
using System;
using System.Data;
using System.Xml.Serialization;

using DotNetNuke.Common.Utilities;
using DotNetNuke.Services.Tokens;

namespace Connect.Conference.Core.Models.Locations
{

 [Serializable(), XmlRoot("Location")]
 public partial class Location
 {

  #region IHydratable
  public override void Fill(IDataReader dr)
  {
   base.Fill(dr);
   ConferenceName = Convert.ToString(Null.SetNull(dr["ConferenceName"], ConferenceName));
   StartDate = (DateTime)(Null.SetNull(dr["StartDate"], StartDate));
   EndDate = (DateTime)(Null.SetNull(dr["EndDate"], EndDate));
   NrSessions = Convert.ToInt32(Null.SetNull(dr["NrSessions"], NrSessions));
   CreatedByUser = Convert.ToString(Null.SetNull(dr["CreatedByUser"], CreatedByUser));
   LastModifiedByUser = Convert.ToString(Null.SetNull(dr["LastModifiedByUser"], LastModifiedByUser));
  }
  #endregion

  #region IPropertyAccess
  public override string GetProperty(string strPropertyName, string strFormat, System.Globalization.CultureInfo formatProvider, DotNetNuke.Entities.Users.UserInfo accessingUser, DotNetNuke.Services.Tokens.Scope accessLevel, ref bool propertyNotFound)
  {
   switch (strPropertyName.ToLower()) {
    case "conferencename": // NVarCharMax
     if (ConferenceName == null)
     {
         return "";
     };
     return PropertyAccess.FormatString(ConferenceName, strFormat);
    case "startdate": // DateTime
     if (StartDate == null)
     {
         return "";
     };
     return ((DateTime)StartDate).ToString(strFormat, formatProvider);
    case "enddate": // DateTime
     if (EndDate == null)
     {
         return "";
     };
     return ((DateTime)EndDate).ToString(strFormat, formatProvider);
    case "nrsessions": // Int
     if (NrSessions == null)
     {
         return "";
     };
     return ((int)NrSessions).ToString(strFormat, formatProvider);
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


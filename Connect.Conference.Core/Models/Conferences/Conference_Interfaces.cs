
using System;
using System.Data;
using System.Xml.Serialization;

using DotNetNuke.Common.Utilities;
using DotNetNuke.Services.Tokens;

namespace Connect.Conference.Core.Models.Conferences
{

 [Serializable(), XmlRoot("Conference")]
 public partial class Conference
 {

  #region IHydratable
  public override void Fill(IDataReader dr)
  {
   base.Fill(dr);
   NrAttendees = Convert.ToInt32(Null.SetNull(dr["NrAttendees"], NrAttendees));
   NrSpeakers = Convert.ToInt32(Null.SetNull(dr["NrSpeakers"], NrSpeakers));
   NrLocations = Convert.ToInt32(Null.SetNull(dr["NrLocations"], NrLocations));
   NrTracks = Convert.ToInt32(Null.SetNull(dr["NrTracks"], NrTracks));
   NrSessions = Convert.ToInt32(Null.SetNull(dr["NrSessions"], NrSessions));
   CreatedByUser = Convert.ToString(Null.SetNull(dr["CreatedByUser"], CreatedByUser));
   LastModifiedByUser = Convert.ToString(Null.SetNull(dr["LastModifiedByUser"], LastModifiedByUser));
  }
  #endregion

  #region IPropertyAccess
  public override string GetProperty(string strPropertyName, string strFormat, System.Globalization.CultureInfo formatProvider, DotNetNuke.Entities.Users.UserInfo accessingUser, DotNetNuke.Services.Tokens.Scope accessLevel, ref bool propertyNotFound)
  {
   switch (strPropertyName.ToLower()) {
    case "nrattendees": // Int
     if (NrAttendees == null)
     {
         return "";
     };
     return ((int)NrAttendees).ToString(strFormat, formatProvider);
    case "nrspeakers": // Int
     if (NrSpeakers == null)
     {
         return "";
     };
     return ((int)NrSpeakers).ToString(strFormat, formatProvider);
    case "nrlocations": // Int
     if (NrLocations == null)
     {
         return "";
     };
     return ((int)NrLocations).ToString(strFormat, formatProvider);
    case "nrtracks": // Int
     if (NrTracks == null)
     {
         return "";
     };
     return ((int)NrTracks).ToString(strFormat, formatProvider);
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


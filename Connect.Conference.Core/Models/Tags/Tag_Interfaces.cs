
using System;
using System.Data;
using System.Xml.Serialization;

using DotNetNuke.Common.Utilities;
using DotNetNuke.Services.Tokens;

namespace Connect.Conference.Core.Models.Tags
{

 [Serializable(), XmlRoot("Tag")]
 public partial class Tag
 {

  #region IHydratable
  public override void Fill(IDataReader dr)
  {
   base.Fill(dr);
   NrSubmittedSessions = Convert.ToInt32(Null.SetNull(dr["NrSubmittedSessions"], NrSubmittedSessions));
   NrAcceptedSessions = Convert.ToInt32(Null.SetNull(dr["NrAcceptedSessions"], NrAcceptedSessions));
   NrVotes = Convert.ToInt32(Null.SetNull(dr["NrVotes"], NrVotes));
   CreatedByUser = Convert.ToString(Null.SetNull(dr["CreatedByUser"], CreatedByUser));
   LastModifiedByUser = Convert.ToString(Null.SetNull(dr["LastModifiedByUser"], LastModifiedByUser));
  }
  #endregion

  #region IPropertyAccess
  public override string GetProperty(string strPropertyName, string strFormat, System.Globalization.CultureInfo formatProvider, DotNetNuke.Entities.Users.UserInfo accessingUser, DotNetNuke.Services.Tokens.Scope accessLevel, ref bool propertyNotFound)
  {
   switch (strPropertyName.ToLower()) {
    case "nrsubmittedsessions": // Int
     if (NrSubmittedSessions == null)
     {
         return "";
     };
     return ((int)NrSubmittedSessions).ToString(strFormat, formatProvider);
    case "nracceptedsessions": // Int
     if (NrAcceptedSessions == null)
     {
         return "";
     };
     return ((int)NrAcceptedSessions).ToString(strFormat, formatProvider);
    case "nrvotes": // Int
     if (NrVotes == null)
     {
         return "";
     };
     return ((int)NrVotes).ToString(strFormat, formatProvider);
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



using System;
using System.Runtime.Serialization;
using Connect.Conference.Core.Common;
using DotNetNuke.ComponentModel.DataAnnotations;

namespace Connect.Conference.Core.Models.Locations
{

    [TableName("vw_Connect_Conference_Locations")]
    [PrimaryKey("LocationId", AutoIncrement = true)]
    [DataContract]
    public partial class Location  : LocationBase 
    {

        #region .ctor
        public Location()  : base() 
        {
        }
        #endregion

        #region Properties
        [DataMember]
        [WebApiSecurity(WebApiSecurityLevel.Private)]
        public string ConferenceName { get; set; }
        [DataMember]
        [WebApiSecurity(WebApiSecurityLevel.Private)]
        public DateTime? StartDate { get; set; }
        [DataMember]
        [WebApiSecurity(WebApiSecurityLevel.Private)]
        public DateTime? EndDate { get; set; }
        [DataMember]
        public int? NrSessions { get; set; }
        [DataMember]
        [WebApiSecurity(WebApiSecurityLevel.Private)]
        public string CreatedByUser { get; set; }
        [DataMember]
        [WebApiSecurity(WebApiSecurityLevel.Private)]
        public string LastModifiedByUser { get; set; }
        #endregion

        #region Methods
        public LocationBase GetLocationBase()
        {
            LocationBase res = new LocationBase();
             res.LocationId = LocationId;
             res.ConferenceId = ConferenceId;
             res.Name = Name;
             res.Description = Description;
             res.Capacity = Capacity;
             res.Sort = Sort;
             res.BackgroundColor = BackgroundColor;
  res.CreatedByUserID = CreatedByUserID;
  res.CreatedOnDate = CreatedOnDate;
  res.LastModifiedByUserID = LastModifiedByUserID;
  res.LastModifiedOnDate = LastModifiedOnDate;
            return res;
        }
        public Location Clone()
        {
            Location res = new Location();
            res.LocationId = LocationId;
            res.ConferenceId = ConferenceId;
            res.Name = Name;
            res.Description = Description;
            res.Capacity = Capacity;
            res.Sort = Sort;
            res.BackgroundColor = BackgroundColor;
            res.ConferenceName = ConferenceName;
            res.StartDate = StartDate;
            res.EndDate = EndDate;
            res.NrSessions = NrSessions;
            res.CreatedByUser = CreatedByUser;
            res.LastModifiedByUser = LastModifiedByUser;
            res.CreatedByUserID = CreatedByUserID;
            res.CreatedOnDate = CreatedOnDate;
            res.LastModifiedByUserID = LastModifiedByUserID;
            res.LastModifiedOnDate = LastModifiedOnDate;
            return res;
        }
        #endregion

    }
}

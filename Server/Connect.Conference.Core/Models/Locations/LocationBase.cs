
using System;
using System.Runtime.Serialization;
using DotNetNuke.ComponentModel.DataAnnotations;
using Connect.Conference.Core.Data;
using Connect.Conference.Core.Common;

namespace Connect.Conference.Core.Models.Locations
{
    [TableName("Connect_Conference_Locations")]
    [PrimaryKey("LocationId", AutoIncrement = true)]
    [DataContract]
    [Scope("ConferenceId")]
    public partial class LocationBase  : AuditableEntity 
    {

        #region .ctor
        public LocationBase()
        {
            LocationId = -1;
        }
        #endregion

        #region Properties
        [DataMember]
        public int LocationId { get; set; }
        [DataMember]
        [WebApiSecurity(WebApiSecurityLevel.Management)]
        public int ConferenceId { get; set; }
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public string Description { get; set; }
        [DataMember]
        public int? Capacity { get; set; }
        [DataMember]
        public int? Sort { get; set; }
        [DataMember]
        public string BackgroundColor { get; set; }
        #endregion

        #region Methods
        public void ReadLocationBase(LocationBase location)
        {
            if (location.LocationId > -1)
                LocationId = location.LocationId;

            if (location.ConferenceId > -1)
                ConferenceId = location.ConferenceId;

            if (!String.IsNullOrEmpty(location.Name))
                Name = location.Name;

            if (!String.IsNullOrEmpty(location.Description))
                Description = location.Description;

            if (location.Capacity > -1)
                Capacity = location.Capacity;

            if (location.Sort > -1)
                Sort = location.Sort;

            if (!String.IsNullOrEmpty(location.BackgroundColor))
                BackgroundColor = location.BackgroundColor;

        }
        #endregion

    }
}




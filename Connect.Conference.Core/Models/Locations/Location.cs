
using System.Runtime.Serialization;
using DotNetNuke.ComponentModel.DataAnnotations;

namespace Connect.Conference.Core.Models.Locations
{

    [TableName("vw_Connect_Conference_Locations")]
    [PrimaryKey("LocationId", AutoIncrement = true)]
    [DataContract]
    [Scope("ConferenceId")]                
    public partial class Location  : LocationBase 
    {

        #region .ctor
        public Location()  : base() 
        {
        }
        #endregion

        #region Properties
        [DataMember]
        public string CreatedByUser { get; set; }
        [DataMember]
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
            return res;
        }
        #endregion

    }
}


using System;
using System.Runtime.Serialization;
using DotNetNuke.ComponentModel.DataAnnotations;

namespace Connect.Conference.Core.Models.Sponsors
{

    [TableName("vw_Connect_Conference_Sponsors")]
    [PrimaryKey("SponsorId", AutoIncrement = true)]
    [DataContract]
    public partial class Sponsor  : SponsorBase 
    {

        #region .ctor
        public Sponsor()  : base() 
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
        public SponsorBase GetSponsorBase()
        {
            SponsorBase res = new SponsorBase();
             res.SponsorId = SponsorId;
             res.ConferenceId = ConferenceId;
             res.Name = Name;
             res.Url = Url;
             res.Description = Description;
             res.ViewOrder = ViewOrder;
             res.SponsorLevel = SponsorLevel;
            res.CreatedByUserID = CreatedByUserID;
            res.CreatedOnDate = CreatedOnDate;
            res.LastModifiedByUserID = LastModifiedByUserID;
            res.LastModifiedOnDate = LastModifiedOnDate;
            return res;
        }
        public Sponsor Clone()
        {
            Sponsor res = new Sponsor();
            res.SponsorId = SponsorId;
            res.ConferenceId = ConferenceId;
            res.Name = Name;
            res.Url = Url;
            res.Description = Description;
            res.ViewOrder = ViewOrder;
            res.SponsorLevel = SponsorLevel;
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

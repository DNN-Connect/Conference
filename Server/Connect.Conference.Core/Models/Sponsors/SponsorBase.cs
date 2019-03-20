
using System;
using System.Runtime.Serialization;
using DotNetNuke.ComponentModel.DataAnnotations;
using Connect.Conference.Core.Data;
using Connect.Conference.Core.Common;

namespace Connect.Conference.Core.Models.Sponsors
{
    [TableName("Connect_Conference_Sponsors")]
    [PrimaryKey("SponsorId", AutoIncrement = true)]
    [DataContract]
    public partial class SponsorBase  : AuditableEntity 
    {

        #region .ctor
        public SponsorBase()
        {
            SponsorId = -1;
        }
        #endregion

        #region Properties
        [DataMember]
        public int SponsorId { get; set; }
        [DataMember]
        [WebApiSecurity(WebApiSecurityLevel.Private)]
        public int ConferenceId { get; set; }
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public string Url { get; set; }
        [DataMember]
        public string Description { get; set; }
        [DataMember]
        public int ViewOrder { get; set; }
        [DataMember]
        public string SponsorLevel { get; set; }
        #endregion

        #region Methods
        public void ReadSponsorBase(SponsorBase sponsor)
        {
            if (sponsor.SponsorId > -1)
                SponsorId = sponsor.SponsorId;

            if (sponsor.ConferenceId > -1)
                ConferenceId = sponsor.ConferenceId;

            if (!String.IsNullOrEmpty(sponsor.Name))
                Name = sponsor.Name;

            if (!String.IsNullOrEmpty(sponsor.Url))
                Url = sponsor.Url;

            if (!String.IsNullOrEmpty(sponsor.Description))
                Description = sponsor.Description;

            if (sponsor.ViewOrder > -1)
                ViewOrder = sponsor.ViewOrder;

            if (!String.IsNullOrEmpty(sponsor.SponsorLevel))
                SponsorLevel = sponsor.SponsorLevel;

        }
        #endregion

    }
}




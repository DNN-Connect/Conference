
using System;
using System.Runtime.Serialization;
using DotNetNuke.ComponentModel.DataAnnotations;
using Connect.Conference.Core.Common;
using Connect.Conference.Core.Data;

namespace Connect.Conference.Core.Models.Speakers
{
    [TableName("Connect_Conference_Speakers")]
    [DataContract]
    public partial class SpeakerBase  : AuditableEntity 
    {

        #region .ctor
        public SpeakerBase()
        {
        }
        #endregion

        #region Properties
        [DataMember]
        public int ConferenceId { get; set; }
        [DataMember]
        public int UserId { get; set; }
        [DataMember]
        public int? Sort { get; set; }
        [DataMember]
        public string Url { get; set; }
        [DataMember]
        public string Description { get; set; }
        [DataMember]
        public string DescriptionShort { get; set; }
        #endregion

        #region Methods
        public void ReadSpeakerBase(SpeakerBase speaker)
        {
            if (speaker.ConferenceId > -1)
                ConferenceId = speaker.ConferenceId;

            if (speaker.UserId > -1)
                UserId = speaker.UserId;

            if (speaker.Sort > -1)
                Sort = speaker.Sort;

            if (!String.IsNullOrEmpty(speaker.Url))
                Url = speaker.Url;

            if (!String.IsNullOrEmpty(speaker.Description))
                Description = speaker.Description;

            if (!String.IsNullOrEmpty(speaker.DescriptionShort))
                DescriptionShort = speaker.DescriptionShort;

        }
        #endregion

    }
}




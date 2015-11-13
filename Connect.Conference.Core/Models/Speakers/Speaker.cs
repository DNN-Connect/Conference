
using System.Runtime.Serialization;
using DotNetNuke.ComponentModel.DataAnnotations;

namespace Connect.Conference.Core.Models.Speakers
{

    [TableName("vw_Connect_Conference_Speakers")]
    [DataContract]
    [Scope("ConferenceId")]                
    public partial class Speaker  : SpeakerBase 
    {

        #region .ctor
        public Speaker()  : base() 
        {
        }
        #endregion

        #region Properties
        [DataMember]
        public string DisplayName { get; set; }
        [DataMember]
        public string FirstName { get; set; }
        [DataMember]
        public string LastName { get; set; }
        [DataMember]
        public string Email { get; set; }
        [DataMember]
        public string Username { get; set; }
        [DataMember]
        public int? PhotoVisibility { get; set; }
        [DataMember]
        public string PhotoFilename { get; set; }
        [DataMember]
        public string PhotoFolder { get; set; }
        [DataMember]
        public int? PhotoWidth { get; set; }
        [DataMember]
        public int? PhotoHeight { get; set; }
        [DataMember]
        public string PhotoContentType { get; set; }
        [DataMember]
        public string Biography { get; set; }
        [DataMember]
        public string Company { get; set; }
        [DataMember]
        public int? NrPresentations { get; set; }
        [DataMember]
        public string CreatedByUser { get; set; }
        [DataMember]
        public string LastModifiedByUser { get; set; }
        #endregion

        #region Methods
        public SpeakerBase GetSpeakerBase()
        {
            SpeakerBase res = new SpeakerBase();
             res.ConferenceId = ConferenceId;
             res.UserId = UserId;
             res.Sort = Sort;
             res.Url = Url;
             res.Description = Description;
             res.DescriptionShort = DescriptionShort;
            return res;
        }
        #endregion

    }
}

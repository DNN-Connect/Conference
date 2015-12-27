
using System;
using System.Runtime.Serialization;
using DotNetNuke.ComponentModel.DataAnnotations;
using Connect.Conference.Core.Common;
using Connect.Conference.Core.Data;

namespace Connect.Conference.Core.Models.Slots
{
    [TableName("Connect_Conference_Slots")]
    [PrimaryKey("SlotId", AutoIncrement = true)]
    [DataContract]
    [Scope("ConferenceId")]
    public partial class SlotBase  : AuditableEntity 
    {

        #region .ctor
        public SlotBase()
        {
            SlotId = -1;
        }
        #endregion

        #region Properties
        [DataMember]
        public int SlotId { get; set; }
        [DataMember]
        public int ConferenceId { get; set; }
        [DataMember]
        public TimeSpan Start { get; set; }
        [DataMember]
        public int DurationMins { get; set; }
        [DataMember]
        public int SlotType { get; set; }
        [DataMember]
        public string Title { get; set; }
        [DataMember]
        public string Description { get; set; }
        [DataMember]
        public int? DayNr { get; set; }
        #endregion

        #region Methods
        public void ReadSlotBase(SlotBase slot)
        {
            if (slot.SlotId > -1)
                SlotId = slot.SlotId;

            if (slot.ConferenceId > -1)
                ConferenceId = slot.ConferenceId;

            Start = slot.Start;

            if (slot.DurationMins > -1)
                DurationMins = slot.DurationMins;

            if (slot.SlotType > -1)
                SlotType = slot.SlotType;

            if (!String.IsNullOrEmpty(slot.Title))
                Title = slot.Title;

            if (!String.IsNullOrEmpty(slot.Description))
                Description = slot.Description;

            if (slot.DayNr > -1)
                DayNr = slot.DayNr;

        }
        #endregion

    }
}




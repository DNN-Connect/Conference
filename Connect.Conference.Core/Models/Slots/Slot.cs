
using System.Runtime.Serialization;
using DotNetNuke.ComponentModel.DataAnnotations;

namespace Connect.Conference.Core.Models.Slots
{

    [TableName("vw_Connect_Conference_Slots")]
    [PrimaryKey("SlotId", AutoIncrement = true)]
    [DataContract]
    public partial class Slot  : SlotBase 
    {

        #region " Private Members "
        #endregion

        #region " Constructors "
        public Slot()  : base() 
        {
        }
        #endregion

        #region " Public Properties "
        [DataMember]
        public string CreatedByUser { get; set; }
        [DataMember]
        public string LastModifiedByUser { get; set; }
        #endregion

        #region " Public Methods "
        public SlotBase GetSlotBase()
        {
            SlotBase res = new SlotBase();
             res.SlotId = SlotId;
             res.ConferenceId = ConferenceId;
             res.Start = Start;
             res.DurationMins = DurationMins;
             res.SlotType = SlotType;
             res.Title = Title;
             res.Description = Description;
            return res;
        }
        #endregion

    }
}

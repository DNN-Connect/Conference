using System;
using System.Collections.Generic;
using System.Linq;
using DotNetNuke.Common;
using DotNetNuke.Data;
using DotNetNuke.Framework;
using Connect.Conference.Core.Models.Slots;

namespace Connect.Conference.Core.Repositories
{

    public partial class SlotRepository : ServiceLocator<ISlotRepository, SlotRepository>, ISlotRepository
    {
        protected override Func<ISlotRepository> GetFactory()
        {
            return () => new SlotRepository();
        }
        public IEnumerable<Slot> GetSlots()
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<Slot>();
                return rep.Get();
            }
        }
        public IEnumerable<Slot> GetSlotsByConference(int conferenceId)
        {
            using (var context = DataContext.Instance())
            {
                return context.ExecuteQuery<Slot>(System.Data.CommandType.Text,
                    "SELECT * FROM {databaseOwner}{objectQualifier}vw_Connect_Conference_Slots WHERE ConferenceId=@0",
                    conferenceId);
            }
        }
        public Slot GetSlot(int slotId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<Slot>();
                return rep.GetById(slotId);
            }
        }
        public int AddSlot(ref SlotBase slot, int userId)
        {
            Requires.NotNull(slot);
            slot.CreatedByUserID = userId;
            slot.CreatedOnDate = DateTime.Now;
            slot.LastModifiedByUserID = userId;
            slot.LastModifiedOnDate = DateTime.Now;
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SlotBase>();
                rep.Insert(slot);
            }
            return slot.SlotId;
        }
        public void DeleteSlot(SlotBase slot)
        {
            Requires.NotNull(slot);
            Requires.PropertyNotNegative(slot, "SlotId");
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SlotBase>();
                rep.Delete(slot);
            }
        }
        public void DeleteSlot(int slotId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SlotBase>();
                rep.Delete("WHERE SlotId = @0", slotId);
            }
        }
        public void UpdateSlot(SlotBase slot, int userId)
        {
            Requires.NotNull(slot);
            Requires.PropertyNotNegative(slot, "SlotId");
            slot.LastModifiedByUserID = userId;
            slot.LastModifiedOnDate = DateTime.Now;
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SlotBase>();
                rep.Update(slot);
            }
        }
    }
    public partial interface ISlotRepository
    {
        IEnumerable<Slot> GetSlots();
        IEnumerable<Slot> GetSlotsByConference(int conferenceId);
        Slot GetSlot(int slotId);
        int AddSlot(ref SlotBase slot, int userId);
        void DeleteSlot(SlotBase slot);
        void DeleteSlot(int slotId);
        void UpdateSlot(SlotBase slot, int userId);
    }
}


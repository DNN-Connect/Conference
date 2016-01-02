using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;
using DotNetNuke.Collections;
using DotNetNuke.Common;
using DotNetNuke.Data;
using DotNetNuke.Framework;
using Connect.Conference.Core.Data;
using Connect.Conference.Core.Models.Slots;

namespace Connect.Conference.Core.Repositories
{

	public class SlotRepository : ServiceLocator<ISlotRepository, SlotRepository>, ISlotRepository
 {
        protected override Func<ISlotRepository> GetFactory()
        {
            return () => new SlotRepository();
        }
        public IEnumerable<Slot> GetSlots(int conferenceId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<Slot>();
                return rep.Get(conferenceId);
            }
        }
        public Slot GetSlot(int conferenceId, int slotId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<Slot>();
                return rep.GetById(slotId, conferenceId);
            }
        }
        public int AddSlot(ref SlotBase slot, int userId)
        {
            Requires.NotNull(slot);
            Requires.PropertyNotNegative(slot, "ConferenceId");
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
        public void DeleteSlot(int conferenceId, int slotId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SlotBase>();
                rep.Delete("WHERE ConferenceId = @0 AND SlotId = @1", conferenceId, slotId);
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

    public interface ISlotRepository
    {
        IEnumerable<Slot> GetSlots(int conferenceId);
        Slot GetSlot(int conferenceId, int slotId);
        int AddSlot(ref SlotBase slot, int userId);
        void DeleteSlot(SlotBase slot);
        void DeleteSlot(int conferenceId, int slotId);
        void UpdateSlot(SlotBase slot, int userId);
    }
}


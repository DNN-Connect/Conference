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

    public partial class SlotRepository : ServiceLocator<ISlotRepository, SlotRepository>, ISlotRepository
    {
        public Slot GetSlot(int conferenceId, int slotId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<Slot>();
                return rep.GetById(slotId, conferenceId);
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
    }

    public partial interface ISlotRepository
    {
        Slot GetSlot(int conferenceId, int slotId);
        void DeleteSlot(int conferenceId, int slotId);
    }
}


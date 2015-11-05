
using Connect.Conference.Core.Models.Slots;
using Connect.Conference.Core.Repositories;

namespace Connect.Conference.Core.Controllers
{

 public partial class SlotsController
 {

  public static Slot GetSlot(int slotId)
  {

    SlotRepository repo = new SlotRepository();
    return repo.GetById(slotId);

  }

  public static int AddSlot(ref SlotBase slot, int userId)
 {

  slot.SetAddingUser(userId);
   SlotBaseRepository repo = new SlotBaseRepository();
   repo.Insert(slot);
   return slot.SlotId;

  }

  public static void UpdateSlot(SlotBase slot, int userId)
  {

   slot.SetModifyingUser(userId);
   SlotBaseRepository repo = new SlotBaseRepository();
   repo.Update(slot);

  }

  public static void DeleteSlot(SlotBase slot)
  {

   SlotBaseRepository repo = new SlotBaseRepository();
   repo.Delete(slot);

  }

 }
}

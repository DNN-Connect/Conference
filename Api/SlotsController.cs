
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Connect.DNN.Modules.Conference.Common;
using Connect.Conference.Core.Models.Slots;
using Connect.Conference.Core.Repositories;

namespace Connect.DNN.Modules.Conference.Api
{

    public partial class SlotsController : ConferenceApiController
    {

        [HttpGet]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.View)]
        public HttpResponseMessage List(int conferenceId)
        {
            return Request.CreateResponse(HttpStatusCode.OK, SlotRepository.Instance.GetSlots(conferenceId));
        }
        [HttpPost]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.Edit)]
        public HttpResponseMessage Update(int conferenceId, int id, [FromBody]SlotDTO slot)
        {
            var bslot = slot.GetSlotBase();
            bslot.Start = new System.TimeSpan(0, slot.NewStartMinutes, 0);
            SlotRepository.Instance.UpdateSlot(bslot, UserInfo.UserID);
            return Request.CreateResponse(HttpStatusCode.OK, slot);
        }

    }

    public class SlotDTO : Slot
    {
        public int NewStartMinutes { get; set; }

    }
}


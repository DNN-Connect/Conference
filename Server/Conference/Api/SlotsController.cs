
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
            return Request.CreateResponse(HttpStatusCode.OK, SlotRepository.Instance.GetSlotsByConference(conferenceId));
        }
        [HttpPost]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.ManageConference)]
        public HttpResponseMessage Update(int conferenceId, int id, [FromBody]SlotDTO slot)
        {
            var bslot = slot.GetSlotBase();
            if (slot.NewStartMinutes > -1) {
                bslot.Start = new System.TimeSpan(0, slot.NewStartMinutes, 0);
            }
            if (bslot.SlotId < 0)
            {
                SlotRepository.Instance.AddSlot(ref bslot, UserInfo.UserID);
            }
            else
            {
                SlotRepository.Instance.UpdateSlot(bslot, UserInfo.UserID);
            }
            return Request.CreateResponse(HttpStatusCode.OK, SlotRepository.Instance.GetSlot(bslot.ConferenceId, bslot.SlotId));
        }
        [HttpPost]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.ManageConference)]
        public HttpResponseMessage Delete(int conferenceId, int id)
        {
            SlotRepository.Instance.DeleteSlot(conferenceId, id);
            return Request.CreateResponse(HttpStatusCode.OK, "");
        }

    }

    public class SlotDTO : Slot
    {
        public int NewStartMinutes { get; set; } = -1;
    }
}



using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DotNetNuke.Web.Api;
using Connect.DNN.Modules.Conference.Common;
using System.Collections.Generic;
using Connect.Conference.Core.Repositories;
using Newtonsoft.Json;

namespace Connect.DNN.Modules.Conference.Api
{

    public partial class TracksController : ConferenceApiController
    {

        #region " Service Methods "

        public class Order
        {
            public int id { get; set; }
            public int order { get; set; }
        }
        public class ReorderDto
        {
            public int ConferenceId;
            public IEnumerable<Order> NewOrder;
        }

        [HttpPost()]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.Edit)]
        public HttpResponseMessage Reorder([NakedBody] string raw)
        {
            var data = JsonConvert.DeserializeObject<ReorderDto>(raw);
            ITrackRepository _repository = TrackRepository.Instance;
            foreach (Order no in data.NewOrder)
            {
                var track = _repository.GetTrack(data.ConferenceId, no.id);
                if (track != null)
                {
                    track.Sort = no.order;
                    _repository.UpdateTrack(track.GetTrackBase(), UserInfo.UserID);
                }
            }
            return Request.CreateResponse(HttpStatusCode.OK, "");
        }
        #endregion

    }
}



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

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.Edit)]
        public HttpResponseMessage Reorder([NakedBody] string raw)
        {
            var data = JsonConvert.DeserializeObject<ReorderDto>(raw);
            ITrackRepository _repository = TrackRepository.Instance;
            foreach (Order no in data.NewOrder)
            {
                var track = _repository.GetTrack(data.Id, no.id);
                if (track != null)
                {
                    track.Sort = no.order;
                    _repository.UpdateTrack(track.GetTrackBase(), UserInfo.UserID);
                }
            }
            return Request.CreateResponse(HttpStatusCode.OK, "");
        }

    }
}


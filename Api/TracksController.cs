
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DotNetNuke.Web.Api;
using Connect.DNN.Modules.Conference.Common;
using System.Collections.Generic;
using Connect.Conference.Core.Repositories;
using Newtonsoft.Json;
using System.Web;

namespace Connect.DNN.Modules.Conference.Api
{

    public partial class TracksController : ConferenceApiController
    {
        [HttpGet()]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.ManageConference)]
        public HttpResponseMessage Search(int conferenceId, string search)
        {
            return Request.CreateResponse(HttpStatusCode.OK, TrackRepository.Instance.SearchTracks(conferenceId, search).ToAutoCompleteList());
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.Edit)]
        public HttpResponseMessage Reorder(int conferenceId)
        {
            var raw = new System.IO.StreamReader(HttpContext.Current.Request.InputStream).ReadToEnd();
            var data = JsonConvert.DeserializeObject<List<Order>>(raw);
            ITrackRepository _repository = TrackRepository.Instance;
            foreach (Order no in data)
            {
                var track = _repository.GetTrack(conferenceId, no.id);
                if (track != null)
                {
                    track.Sort = no.order;
                    _repository.UpdateTrack(track.GetTrackBase(), UserInfo.UserID);
                }
            }
            return Request.CreateResponse(HttpStatusCode.OK, "");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.Edit)]
        public HttpResponseMessage Delete(int conferenceId, int id)
        {
            ISessionTrackRepository _stRepo = SessionTrackRepository.Instance;
            _stRepo.DeleteSessionTracksByTrack(id);
            ITrackRepository _repository = TrackRepository.Instance;
            _repository.DeleteTrack(conferenceId, id);
            return Request.CreateResponse(HttpStatusCode.OK, "");
        }

    }
}


using System.Net;
using System.Net.Http;
using System.Web.Http;
using DotNetNuke.Web.Api;
using Connect.DNN.Modules.Conference.Common;
using System.Web;
using Newtonsoft.Json;
using System.Collections.Generic;
using Connect.Conference.Core.Repositories;

namespace Connect.DNN.Modules.Conference.Api
{

	public partial class SpeakersController : ConferenceApiController
	{

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.Edit)]
        public HttpResponseMessage Reorder(int conferenceId)
        {
            var raw = new System.IO.StreamReader(HttpContext.Current.Request.InputStream).ReadToEnd();
            var data = JsonConvert.DeserializeObject<List<Order>>(raw);
            ISpeakerRepository _repository = SpeakerRepository.Instance;
            foreach (Order no in data)
            {
                var speaker = _repository.GetSpeaker(conferenceId, no.id);
                if (speaker != null)
                {
                    speaker.Sort = no.order;
                    _repository.UpdateSpeaker(speaker.GetSpeakerBase(), UserInfo.UserID);
                }
            }
            return Request.CreateResponse(HttpStatusCode.OK, "");
        }

    }
}


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

	public partial class SessionsController : ConferenceApiController
	{

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.Edit)]
        public HttpResponseMessage Reorder(int conferenceId)
        {
            var raw = new System.IO.StreamReader(HttpContext.Current.Request.InputStream).ReadToEnd();
            var data = JsonConvert.DeserializeObject<List<Order>>(raw);
            ISessionRepository _repository = SessionRepository.Instance;
            foreach (Order no in data)
            {
                var session = _repository.GetSession(conferenceId, no.id);
                if (session != null)
                {
                    session.Sort = no.order;
                    _repository.UpdateSession(session.GetSessionBase(), UserInfo.UserID);
                }
            }
            return Request.CreateResponse(HttpStatusCode.OK, "");
        }

        public class voteDTO
        {
            public int vote { get; set; }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.Authenticated)]
        public HttpResponseMessage Vote(int conferenceId, int id, [FromBody]voteDTO vote)
        {
            if (vote.vote == 1)
            {
                SessionVoteRepository.Instance.SetSessionVote(id, UserInfo.UserID);
            }
            else
            {
                SessionVoteRepository.Instance.DeleteSessionVote(id, UserInfo.UserID);
            }
            return Request.CreateResponse(HttpStatusCode.OK, "");
        }

    }
}


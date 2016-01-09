using System.Net;
using System.Net.Http;
using System.Web.Http;
using DotNetNuke.Web.Api;
using Connect.DNN.Modules.Conference.Common;
using Connect.Conference.Core.Repositories;

namespace Connect.DNN.Modules.Conference.Api
{

    public partial class TagsController : ConferenceApiController
    {

        [HttpGet()]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.View)]
        public HttpResponseMessage Search(int conferenceId, string search)
        {
            return Request.CreateResponse(HttpStatusCode.OK, TagRepository.Instance.SearchTags(conferenceId, search).ToAutoCompleteList());
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
                TagVoteRepository.Instance.SetTagVote(id, UserInfo.UserID);
            }
            else
            {
                TagVoteRepository.Instance.DeleteTagVote(id, UserInfo.UserID);
            }
            return Request.CreateResponse(HttpStatusCode.OK, "");
        }

    }
}


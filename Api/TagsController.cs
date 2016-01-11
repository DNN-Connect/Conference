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

        public class newTagDTO
        {
            public string tagName { get; set; }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.Authenticated)]
        public HttpResponseMessage Add(int conferenceId, [FromBody]newTagDTO newTag)
        {
            var newTagName = newTag.tagName.Trim();
            newTagName = newTagName.Substring(0, 1).ToUpper() + newTagName.Substring(1);
            var tag = TagRepository.Instance.GetTagByName(conferenceId, newTagName);
            if (tag != null)
            {
                return ServiceError("Tag exists");
            }
            var tagToAdd = new Connect.Conference.Core.Models.Tags.TagBase() { ConferenceId = conferenceId, TagName = newTagName };
            TagRepository.Instance.AddTag(ref tagToAdd, UserInfo.UserID);
            tag = TagRepository.Instance.GetTag(conferenceId, tagToAdd.TagId);
            return Request.CreateResponse(HttpStatusCode.OK, tag);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.ManageConference)]
        public HttpResponseMessage Delete(int conferenceId, int id)
        {
            TagRepository.Instance.DeleteTag(conferenceId, id);
            return Request.CreateResponse(HttpStatusCode.OK, "");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.ManageConference)]
        public HttpResponseMessage Edit(int conferenceId, int id, [FromBody]newTagDTO editedTag)
        {
            var tag = TagRepository.Instance.GetTag(conferenceId, id).GetTagBase();
            var newTagName = editedTag.tagName.Trim();
            newTagName = newTagName.Substring(0, 1).ToUpper() + newTagName.Substring(1);
            tag.TagName = newTagName;
            TagRepository.Instance.UpdateTag(tag, UserInfo.UserID);
            return Request.CreateResponse(HttpStatusCode.OK, TagRepository.Instance.GetTag(conferenceId, tag.TagId));
        }

    }
}


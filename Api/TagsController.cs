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

        #region " Service Methods "
        [HttpGet()]
        [DnnModuleAuthorize(AccessLevel = DotNetNuke.Security.SecurityAccessLevel.View)]
        public HttpResponseMessage Search(int conferenceId, string search)
        {
            return Request.CreateResponse(HttpStatusCode.OK, TagRepository.Instance.SearchTags(conferenceId, search).ToAutoCompleteList());
        }
        #endregion

    }
}


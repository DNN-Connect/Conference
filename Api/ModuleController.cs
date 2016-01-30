using Connect.DNN.Modules.Conference.Common;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Connect.DNN.Modules.Conference.Api
{

    public partial class ModuleController : ConferenceApiController
    {
        [HttpGet()]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.ManageConference)]
        public HttpResponseMessage SearchUsers(int conferenceId, string field, string search)
        {
            return Request.CreateResponse(HttpStatusCode.OK, Connect.Conference.Core.Common.Globals.SearchUsers(PortalSettings.PortalId, field, search));
        }
    }
}


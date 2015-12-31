
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DotNetNuke.Web.Api;
using Connect.DNN.Modules.Conference.Common;

namespace Connect.DNN.Modules.Conference.Api
{

	public partial class SlotsController : ConferenceApiController
	{

		[HttpGet()]
		[ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.View)]
		public HttpResponseMessage List(int conferenceId)
		{
			return Request.CreateResponse(HttpStatusCode.OK, Connect.Conference.Core.Repositories.SlotRepository.Instance.GetSlots(conferenceId));
		}

	}
}


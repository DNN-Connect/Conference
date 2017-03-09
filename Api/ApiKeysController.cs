
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DotNetNuke.Web.Api;
using Connect.Conference.Core.Repositories;

namespace Connect.DNN.Modules.Conference.Api
{

	public partial class ApiKeysController : ConferenceApiController
	{

		[HttpGet()]
		[DnnModuleAuthorize(AccessLevel = DotNetNuke.Security.SecurityAccessLevel.View)]
		public HttpResponseMessage MyMethod(int id)
		{
			bool res = true;
			return Request.CreateResponse(HttpStatusCode.OK, res);
		}

	}
}



using System.Net;
using System.Net.Http;
using System.Web.Http;
using DotNetNuke.Web.Api;
using Connect.DNN.Modules.Conference.Common;

namespace Connect.DNN.Modules.Conference.Api
{

	public partial class SessionAttendeesController : ConferenceApiController
	{

		#region " Service Methods "
		[HttpGet()]
		[DnnModuleAuthorize(AccessLevel = DotNetNuke.Security.SecurityAccessLevel.View)]
		public HttpResponseMessage MyMethod(int id)
		{
			bool res = true;
			return Request.CreateResponse(HttpStatusCode.OK, res);
		}
		#endregion

	}
}


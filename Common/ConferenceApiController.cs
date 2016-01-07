using DotNetNuke.Web.Api;
using System.Net;
using System.Net.Http;

namespace Connect.DNN.Modules.Conference.Common
{
    public class ConferenceApiController : DnnApiController
    {
        private ContextHelper _conferenceModuleContext;
        public ContextHelper ConferenceModuleContext
        {
            get { return _conferenceModuleContext ?? (_conferenceModuleContext = new ContextHelper(this)); }
        }

        public HttpResponseMessage ServiceError(string message) {
            return Request.CreateResponse(HttpStatusCode.InternalServerError, message);
        }

        public HttpResponseMessage AccessViolation(string message)
        {
            return Request.CreateResponse(HttpStatusCode.Unauthorized, message);
        }

    }
}
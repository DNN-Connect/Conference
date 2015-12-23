using DotNetNuke.Web.Api;

namespace Connect.DNN.Modules.Conference.Common
{
    public class ConferenceApiController : DnnApiController
    {
        private ContextHelper _conferenceModuleContext;
        public ContextHelper ConferenceModuleContext
        {
            get { return _conferenceModuleContext ?? (_conferenceModuleContext = new ContextHelper(this)); }
        }

    }
}
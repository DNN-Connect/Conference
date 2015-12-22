using DotNetNuke.Web.Mvc.Framework.Controllers;

namespace Connect.DNN.Modules.Conference.Common
{
    public class ConferenceMvcController : DnnController
    {

        private ContextHelper _conferenceModuleContext;
        public ContextHelper ConferenceModuleContext {
            get { return _conferenceModuleContext ?? (_conferenceModuleContext = new ContextHelper(this)); }
        }

    }
}
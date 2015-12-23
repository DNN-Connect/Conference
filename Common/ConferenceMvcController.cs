using DotNetNuke.Web.Mvc.Framework.Controllers;
using System.Web.Mvc;

namespace Connect.DNN.Modules.Conference.Common
{
    public class ConferenceMvcController : DnnController
    {

        private ContextHelper _conferenceModuleContext;
        public ContextHelper ConferenceModuleContext
        {
            get { return _conferenceModuleContext ?? (_conferenceModuleContext = new ContextHelper(this)); }
        }

        public string GetRouteParameter() {
            if (ControllerContext.HttpContext.Request.Params["ret"] == null) {
                return "";
            } else {
                return ControllerContext.HttpContext.Request.Params["ret"];
            }
        }

    }
}
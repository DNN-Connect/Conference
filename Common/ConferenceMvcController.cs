using DotNetNuke.Web.Mvc.Framework.Controllers;
using DotNetNuke.Web.Mvc.Routing;
using System.Web.Mvc;
using System.Web.Routing;

namespace Connect.DNN.Modules.Conference.Common
{
    public class ConferenceMvcController : DnnController
    {

        private ContextHelper _conferenceModuleContext;
        public ContextHelper ConferenceModuleContext
        {
            get { return _conferenceModuleContext ?? (_conferenceModuleContext = new ContextHelper(this)); }
        }

        public string GetRouteParameter()
        {
            if (ControllerContext.HttpContext.Request.Params["ret"] == null)
            {
                return "";
            }
            else
            {
                return ControllerContext.HttpContext.Request.Params["ret"];
            }
        }

        public ActionResult ReturnRoute(int? id, ActionResult defaultRoute)
        {
            RouteValueDictionary routeValues = new RouteValueDictionary();
            switch (GetRouteParameter())
            {
                case "c-tls":
                    routeValues["controller"] = "Conference";
                    routeValues["action"] = "TracksLocationsSlots";
                    routeValues.Add("conferenceId", id);
                    return Redirect(ModuleRoutingProvider.Instance().GenerateUrl(routeValues, ModuleContext));
                case "c-ss":
                    routeValues["controller"] = "Conference";
                    routeValues["action"] = "SessionsSpeakers";
                    routeValues.Add("conferenceId", id);
                    return Redirect(ModuleRoutingProvider.Instance().GenerateUrl(routeValues, ModuleContext));
                case "c-m":
                    routeValues["controller"] = "Conference";
                    routeValues["action"] = "Manage";
                    routeValues.Add("conferenceId", id);
                    return Redirect(ModuleRoutingProvider.Instance().GenerateUrl(routeValues, ModuleContext));
                case "s-v":
                    routeValues["controller"] = "Session";
                    routeValues["action"] = "View";
                    routeValues.Add("conferenceId", ControllerContext.HttpContext.Request.Params["ConferenceId"]);
                    routeValues.Add("SessionId", id);
                    return Redirect(ModuleRoutingProvider.Instance().GenerateUrl(routeValues, ModuleContext));
            }
            return defaultRoute;
        }

    }
}
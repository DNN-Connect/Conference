using System.Web.Mvc;
using DotNetNuke.Web.Mvc.Helpers;
using DotNetNuke.Web.Mvc.Framework;
using System.Web;

namespace Connect.DNN.Modules.Conference.Common
{
    public abstract class ConferenceWebPage : DnnWebViewPage
    {

        public ContextHelper ConferenceModuleContext { get; set; }

        public override void InitHelpers()
        {
            Ajax = new AjaxHelper<object>(ViewContext, this);
            Html = new DnnHtmlHelper<object>(ViewContext, this);
            Url = new DnnUrlHelper(ViewContext);
            Dnn = new DnnHelper<object>(ViewContext, this);
            ConferenceModuleContext = new ContextHelper(ViewContext);
        }

        public string SerializedResources()
        {
            return Newtonsoft.Json.JsonConvert.SerializeObject(DotNetNuke.Services.Localization.LocalizationProvider.Instance.GetCompiledResourceFile(Dnn.PortalSettings, "/DesktopModules/MVC/Connect/Conference/App_LocalResources/ClientResources.resx",
                    System.Threading.Thread.CurrentThread.CurrentCulture.Name));
        }

        public void RequirePermissionLevel(bool level)
        {
            ConferenceModuleContext.RequirePermissionLevel(level);
        }

        public string Locale
        {
            get
            {
                return System.Threading.Thread.CurrentThread.CurrentCulture.Name;
            }
        }

        public MvcHtmlString ReturnLink(string linkText, string defaultController, string defaultActionName, object defaultRouteValues, object htmlAttributes, int? id)
        {
            var ret = "";
            if (HttpContext.Current.Request.Params["ret"] != null)
            {
                ret = HttpContext.Current.Request.Params["ret"];
            }
            switch (ret)
            {
                case "c-tls":
                    return Html.ActionLink(linkText, "TracksLocationsSlots", "Conference", new { ConferenceId = id }, htmlAttributes);
                case "c-ss":
                    return Html.ActionLink(linkText, "SessionsSpeakers", "Conference", new { ConferenceId = id }, htmlAttributes);
                case "c-m":
                    return Html.ActionLink(linkText, "Manage", "Conference", new { ConferenceId = id }, htmlAttributes);
            }
            return Html.ActionLink(linkText, defaultActionName, defaultController, defaultRouteValues, htmlAttributes);
        }

    }
}
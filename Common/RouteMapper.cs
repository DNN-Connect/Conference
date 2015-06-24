using DotNetNuke.Web.Api;

namespace Connect.DNN.Modules.Conference.Common
{
    public class RouteMapper : IServiceRouteMapper
    {

        #region " IServiceRouteMapper "
        public void RegisterRoutes(IMapRoute mapRouteManager)
        {
            mapRouteManager.MapHttpRoute("Connect/Conference", "ConferenceMap1", "{controller}/{action}", null, null, new[] { "Connect.DNN.Modules.Conference.Controllers" });
            mapRouteManager.MapHttpRoute("Connect/Conference", "ConferenceMap2", "{controller}/{action}/{id}", null, new { id = "\\d*" }, new[] { "Connect.DNN.Modules.Conference.Controllers" });
        }
        #endregion

    }
}
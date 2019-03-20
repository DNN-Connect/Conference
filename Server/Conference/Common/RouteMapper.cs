using DotNetNuke.Web.Api;

namespace Connect.DNN.Modules.Conference.Common
{
    public class RouteMapper : IServiceRouteMapper
    {
        public void RegisterRoutes(IMapRoute mapRouteManager)
        {
            mapRouteManager.MapHttpRoute("Connect/Conference", "ConferenceMap1", "{controller}/{action}", null, null, new[] { "Connect.DNN.Modules.Conference.Api" });
            mapRouteManager.MapHttpRoute("Connect/Conference", "ConferenceMap2", "{controller}/{action}/{id}", null, new { id = "-?\\d+" }, new[] { "Connect.DNN.Modules.Conference.Api" });
            mapRouteManager.MapHttpRoute("Connect/Conference", "ConferenceMap3", "Conference/{conferenceId}/{controller}/{action}", null, new { conferenceId = "\\d*" }, new[] { "Connect.DNN.Modules.Conference.Api" });
            mapRouteManager.MapHttpRoute("Connect/Conference", "ConferenceMap4", "Conference/{conferenceId}/{controller}/{action}/{id}", null, new { conferenceId = "\\d*", id = "-?\\d+" }, new[] { "Connect.DNN.Modules.Conference.Api" });
        }
    }
}
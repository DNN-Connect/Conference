using DotNetNuke.Entities.Modules;
using DotNetNuke.Entities.Portals;

namespace Connect.DNN.Modules.Conference.Common
{
    public class AppLink
    {
        public string Host { get; set; }
        public string Scheme { get; set; }
        public int TabId { get; set; }
        public int ModuleId { get; set; }
        public string Username { get; set; }
        public int ConferenceId { get; set; }

        public AppLink(PortalSettings portalSettings, ModuleInfo module, int conferenceId)
        {
            Host = portalSettings.PortalAlias.HTTPAlias;
            Scheme = portalSettings.ActiveTab.IsSecure ? "https" : "http";
            TabId = module.TabID;
            ModuleId = module.ModuleID;
            Username = portalSettings.UserInfo.Username;
            ConferenceId = conferenceId;
        }
    }
}
using DotNetNuke.Entities.Modules;
using DotNetNuke.Entities.Portals;

namespace Connect.DNN.Modules.Conference.Common
{
    public class AppLink
    {
        public string h { get; set; }
        public int t { get; set; }
        public int m { get; set; }
        public string u { get; set; }
        public int c { get; set; }

        public AppLink(PortalSettings portalSettings, ModuleInfo module, int conferenceId)
        {
            h = portalSettings.PortalAlias.HTTPAlias;
            t = module.TabID;
            m = module.ModuleID;
            u = portalSettings.UserInfo.Username;
            c = conferenceId;
        }
    }
}
using DotNetNuke.Web.Client.ClientResourceManagement;
using DotNetNuke.Web.Mvc.Framework.Controllers;
using Connect.DNN.Modules.Conference.Common.Settings;

namespace Connect.DNN.Modules.Conference.Common
{
    public class ConferenceMvcController : DnnController
    {

        private ContextSecurity _security;
        public ContextSecurity Security
        {
            get { return _security ?? (_security = new ContextSecurity(ActiveModule)); }
        }

        private ModuleSettings _settings;
        public ModuleSettings Settings
        {
            get { return _settings ?? (_settings = ModuleSettings.GetSettings(ActiveModule)); }
        }

        public void AddCss(string cssFile, string name, string version)
        {
            ClientResourceManager.RegisterStyleSheet(DnnPage, string.Format("~/DesktopModules/MVC/Connect/Conference/css/{0}", cssFile), 70, "", name, version);
        }
        public void AddCss(string cssFile)
        {
            ClientResourceManager.RegisterStyleSheet(DnnPage, string.Format("~/DesktopModules/MVC/Connect/Conference/css/{0}", cssFile));
        }
        public void AddBootstrap()
        {
            AddCss("bootstrap.min.css", "bootstrap", "3.3.6");
        }

        public void AddScript(string scriptName, string name, string version)
        {
            ClientResourceManager.RegisterScript(DnnPage, string.Format("~/DesktopModules/MVC/Connect/Conference/js/{0}", scriptName), 70, "", name, version);
        }
        public void AddScript(string scriptName)
        {
            ClientResourceManager.RegisterScript(DnnPage, string.Format("~/DesktopModules/MVC/Connect/Conference/js/{0}", scriptName));
        }

        public void AddEditScripts()
        {
            AddScript("bootstrap.min.js", "bootstrap", "3.3.5");
            AddScript("moment.min.js", "moment", "2.10.6");
            AddScript("bootstrap-datetimepicker.min.js", "bootstrap-datetimepicker", "4.17.37");
        }

        public void AddModuleScript()
        {
            AddScript("Connect.Conference.js");
        }

    }
}
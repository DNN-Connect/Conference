using System;
using System.Web.Mvc;
using DotNetNuke.Common;
using DotNetNuke.UI.Modules;
using DotNetNuke.Web.Client.ClientResourceManagement;
using DotNetNuke.Web.Mvc.Framework.Controllers;
using Connect.DNN.Modules.Conference.Common.Settings;

namespace Connect.DNN.Modules.Conference.Common
{
    public class ContextHelper
    {
        public ModuleInstanceContext ModuleContext { get; set; }
        public System.Web.UI.Page Page { get; set; }

        public ContextHelper(ViewContext viewContext)
        {
            Requires.NotNull("viewContext", viewContext);

            var controller = viewContext.Controller as IDnnController;

            if (controller == null)
            {
                throw new InvalidOperationException("The DnnUrlHelper class can only be used in Views that inherit from DnnWebViewPage");
            }

            ModuleContext = controller.ModuleContext;
            Page = controller.DnnPage;
        }

        public ContextHelper(DnnController context)
        {
            Requires.NotNull("context", context);
            ModuleContext = context.ModuleContext;
            Page = context.DnnPage;
        }

        private ContextSecurity _security;
        public ContextSecurity Security
        {
            get { return _security ?? (_security = new ContextSecurity(ModuleContext.Configuration)); }
        }

        private ModuleSettings _settings;
        public ModuleSettings Settings
        {
            get { return _settings ?? (_settings = ModuleSettings.GetSettings(ModuleContext.Configuration)); }
        }

        #region Css Files
        public void AddCss(string cssFile, string name, string version)
        {
            ClientResourceManager.RegisterStyleSheet(Page, string.Format("~/DesktopModules/MVC/Connect/Conference/css/{0}", cssFile), 70, "", name, version);
        }
        public void AddCss(string cssFile)
        {
            ClientResourceManager.RegisterStyleSheet(Page, string.Format("~/DesktopModules/MVC/Connect/Conference/css/{0}", cssFile));
        }
        public void AddBootstrapCss()
        {
            AddCss("bootstrap.min.css", "bootstrap", "3.3.6");
        }
        #endregion

        #region Js Files
        public void AddScript(string scriptName, string name, string version)
        {
            ClientResourceManager.RegisterScript(Page, string.Format("~/DesktopModules/MVC/Connect/Conference/js/{0}", scriptName), 70, "", name, version);
        }
        public void AddScript(string scriptName)
        {
            ClientResourceManager.RegisterScript(Page, string.Format("~/DesktopModules/MVC/Connect/Conference/js/{0}", scriptName));
        }
        public void AddModuleScript()
        {
            AddScript("Connect.Conference.js");
        }
        public void AddBootstrapJs()
        {
            AddScript("bootstrap.min.js", "bootstrap", "3.3.5");
        }
        public void AddEditScripts()
        {
            AddBootstrapJs();
            AddScript("moment.min.js", "moment", "2.10.6");
            AddScript("bootstrap-datetimepicker.min.js", "bootstrap-datetimepicker", "4.17.37");
        }
        #endregion

    }
}
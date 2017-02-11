using System;
using System.Web.Mvc;
using DotNetNuke.Common;
using DotNetNuke.Web.Client.ClientResourceManagement;
using DotNetNuke.Web.Mvc.Framework.Controllers;
using DotNetNuke.Web.Api;
using DotNetNuke.Entities.Modules;
using Newtonsoft.Json;
using DotNetNuke.Entities.Portals;
using DotNetNuke.Framework;
using DotNetNuke.Framework.JavaScriptLibraries;
using DotNetNuke.UI.Utilities;
using System.Globalization;
using System.Web.UI;

namespace Connect.DNN.Modules.Conference.Common
{
    public class ContextHelper
    {
        public ModuleInfo ModuleContext { get; set; }
        public System.Web.UI.Page Page { get; set; }

        public ContextHelper(ViewContext viewContext)
        {
            Requires.NotNull("viewContext", viewContext);

            var controller = viewContext.Controller as IDnnController;

            if (controller == null)
            {
                throw new InvalidOperationException("The DnnUrlHelper class can only be used in Views that inherit from DnnWebViewPage");
            }

            ModuleContext = controller.ModuleContext.Configuration;
            Page = controller.DnnPage;
        }

        public ContextHelper(DnnController context)
        {
            Requires.NotNull("context", context);
            ModuleContext = context.ModuleContext.Configuration;
            Page = context.DnnPage;
        }

        public ContextHelper(DnnApiController context)
        {
            Requires.NotNull("context", context);
            ModuleContext = context.ActiveModule;
        }

        private ContextSecurity _security;
        public ContextSecurity Security
        {
            get { return _security ?? (_security = new ContextSecurity(ModuleContext)); }
        }

        private ModuleSettings _settings;
        public ModuleSettings Settings
        {
            get { return _settings ?? (_settings = ModuleSettings.GetSettings(ModuleContext)); }
        }

        public string AppLink()
        {
            if (Settings.Conference > 0)
            {
                return JsonConvert.SerializeObject(new AppLink(PortalSettings.Current, ModuleContext, Settings.Conference));
            }
            else
            {
                return JsonConvert.SerializeObject(new AppLink(PortalSettings.Current, ModuleContext, -1));
            }
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
        public void AddJqueryUi()
        {
            DotNetNuke.Framework.JavaScriptLibraries.JavaScript.RequestRegistration(DotNetNuke.Framework.JavaScriptLibraries.CommonJs.jQueryUI);
        }
        public void AddScript(string scriptName, string name, string version)
        {
            ClientResourceManager.RegisterScript(Page, string.Format("~/DesktopModules/MVC/Connect/Conference/js/{0}", scriptName), 70, "", name, version);
        }
        public void AddScript(string scriptName)
        {
            ClientResourceManager.RegisterScript(Page, string.Format("~/DesktopModules/MVC/Connect/Conference/js/{0}", scriptName));
        }
        public void AddModuleService()
        {
            RegisterAjaxScript();
            AddScript("ConferenceService.js");
        }
        public void AddBootstrapJs()
        {
            AddScript("bootstrap.min.js", "bootstrap", "3.3.6");
        }
        public void AddReactJs()
        {
            AddScript("react.min.js", "react", "0.13.3");
        }
        public void AddEditScripts()
        {
            RegisterAjaxScript();
            AddJqueryUi();
            AddBootstrapJs();
            AddReactJs();
            AddScript("interact.min.js", "interact", "1.2.6");
            AddScript("moment-with-locales.min.js", "moment", "2.10.6");
            AddScript("bootstrap-datetimepicker.min.js", "bootstrap-datetimepicker", "4.17.37");
            AddMainScript();
        }
        public void AddMainScript()
        {
            AddScript("Conference.js");
        }
        public void RequirePermissionLevel(bool level)
        {
            if (!level)
            {
                ThrowAccessViolation();
            }
        }
        public void ThrowAccessViolation()
        {
            throw new Exception("You do not have adequate permissions to view this resource. Please check your login status.");
        }
        #endregion

        public void RegisterAjaxScript()
        {
            ServicesFramework.Instance.RequestAjaxAntiForgerySupport();
            RegisterAjaxAntiForgery();
            var path = ServicesFramework.GetServiceFrameworkRoot();
            if (String.IsNullOrEmpty(path))
            {
                return;
            }

            JavaScript.RegisterClientReference(Page, ClientAPI.ClientNamespaceReferences.dnn);
            ClientAPI.RegisterClientVariable(Page, "sf_siteRoot", path, /*overwrite*/ true);
            ClientAPI.RegisterClientVariable(Page, "sf_tabId", PortalSettings.Current.ActiveTab.TabID.ToString(CultureInfo.InvariantCulture), /*overwrite*/ true);

            string scriptPath;
            if (HttpContextSource.Current.IsDebuggingEnabled)
            {
                scriptPath = "~/js/Debug/dnn.servicesframework.js";
            }
            else
            {
                scriptPath = "~/js/dnn.servicesframework.js";
            }

            ClientResourceManager.RegisterScript(Page, scriptPath);
        }
        public void RegisterAjaxAntiForgery()
        {
            var ctl = Page.FindControl("ClientResourcesFormBottom");
            if (ctl != null)
            {
                foreach (Control c in ctl.Controls)
                {
                    if (c.GetType().Name == "LiteralControl")
                    {
                        if (((LiteralControl)c).Text.Contains("__RequestVerificationToken"))
                        {
                            return;
                        }
                    }
                }
                ctl.Controls.Add(new LiteralControl(System.Web.Helpers.AntiForgery.GetHtml().ToHtmlString()));
            }
        }

    }
}
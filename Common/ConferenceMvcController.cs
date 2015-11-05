using System.Linq;
using System.Web.Mvc;
using DotNetNuke.Common;
using DotNetNuke.Entities.Modules.Actions;
using DotNetNuke.Web.Mvc.Framework.ActionFilters;
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


    }
}
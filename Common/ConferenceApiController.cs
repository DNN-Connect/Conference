using Connect.DNN.Modules.Conference.Common.Settings;
using DotNetNuke.Web.Api;

namespace Connect.DNN.Modules.Conference.Common
{
    public class ConferenceApiController : DnnApiController
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
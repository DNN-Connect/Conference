using DotNetNuke.Web.Api;

namespace Connect.Conference.Core.Common
{
    public class ConferenceApiController : DnnApiController
    {
        private ContextSecurity _security;
        public ContextSecurity Security
        {
            get { return _security ?? (_security = new ContextSecurity(ActiveModule)); }
        }

        //private ModuleSettings _settings;
        //public ModuleSettings Settings
        //{
        //    get { return _settings ?? (_settings = ModuleSettings.GetSettings(ActiveModule)); }
        //}

    }
}
using DotNetNuke.Common;
using DotNetNuke.Entities.Portals;
using DotNetNuke.Entities.Users;
using DotNetNuke.Instrumentation;
using DotNetNuke.Web.Api;

namespace Connect.DNN.Modules.Conference.Common
{
    public enum SecurityAccessLevel
    {
        Anonymous = 0,
        Authenticated = 1,
        View = 2,
        Edit = 3,
        Admin = 4,
        Host = 5,
        SessionSubmit = 6,
        AttendConference = 7,
        ManageConference = 8,
        AttendsConference = 9
    }

    public class ConferenceAuthorizeAttribute : AuthorizeAttributeBase, IOverrideDefaultAuthLevel
    {
        private static readonly ILog Logger = LoggerSource.Instance.GetLogger(typeof(ConferenceAuthorizeAttribute));
        public SecurityAccessLevel SecurityLevel { get; set; }
        public UserInfo User { get; set; }
        public bool AllowApiKeyAccess { get; set; } = false;

        public ConferenceAuthorizeAttribute()
        {
            SecurityLevel = SecurityAccessLevel.Admin;
        }

        public ConferenceAuthorizeAttribute(SecurityAccessLevel accessLevel)
        {
            SecurityLevel = accessLevel;
        }

        public override bool IsAuthorized(AuthFilterContext context)
        {
            Logger.Trace("IsAuthorized");
            if (SecurityLevel == SecurityAccessLevel.Anonymous)
            {
                Logger.Trace("Anonymous");
                return true;
            }
            User = HttpContextSource.Current.Request.IsAuthenticated ? UserController.Instance.GetCurrentUserInfo() : new UserInfo();
            Logger.Trace("UserId " + User.UserID.ToString());
            if (AllowApiKeyAccess && User.UserID == -1 && HttpContextSource.Current.Request.Params["apikey"] != null)
            {
                Logger.Trace("Using API key");
                var conferenceId = int.Parse(HttpContextSource.Current.Request.Params["conferenceid"]);
                var apiKey = Connect.Conference.Core.Repositories.ApiKeyRepository.Instance.GetApiKey(HttpContextSource.Current.Request.Params["apikey"]);
                if (apiKey != null && apiKey.Expires != null && apiKey.Expires < System.DateTime.Now)
                {
                    Connect.Conference.Core.Repositories.ApiKeyRepository.Instance.DeleteApiKey(apiKey.GetApiKeyBase());
                    apiKey = null;
                }
                if (apiKey != null && apiKey.ConferenceId == conferenceId)
                {
                    User = UserController.Instance.GetUserById(PortalSettings.Current.PortalId, apiKey.CreatedByUserID);
                    HttpContextSource.Current.Items["UserInfo"] = User; // Set thread user - this will expire after the request!
                }
            }
            ContextSecurity security = new ContextSecurity(context.ActionContext.Request.FindModuleInfo());
            Logger.Trace(security.ToString());
            switch (SecurityLevel)
            {
                case SecurityAccessLevel.Authenticated:
                    return User.UserID != -1;
                case SecurityAccessLevel.Host:
                    return User.IsSuperUser;
                case SecurityAccessLevel.Admin:
                    return security.IsAdmin;
                case SecurityAccessLevel.Edit:
                    return security.CanEdit;
                case SecurityAccessLevel.View:
                    return security.CanView;
                case SecurityAccessLevel.SessionSubmit:
                    return security.CanSubmitSessions;
                case SecurityAccessLevel.AttendConference:
                    return security.CanAttend;
                case SecurityAccessLevel.ManageConference:
                    return security.CanManage;
                case SecurityAccessLevel.AttendsConference:
                    var conferenceId = int.Parse(HttpContextSource.Current.Request.Params["conferenceid"]);
                    return Connect.Conference.Core.Repositories.AttendeeRepository.Instance.GetAttendee(conferenceId, security.UserId) != null;
            }
            return false;
        }
    }
}
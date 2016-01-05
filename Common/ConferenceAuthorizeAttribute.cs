using DotNetNuke.Common;
using DotNetNuke.Entities.Users;
using DotNetNuke.Web.Api;

namespace Connect.DNN.Modules.Conference.Common
{
    public enum SecurityAccessLevel
    {
        Anonymous = 0,
        View = 1,
        Edit = 2,
        Admin = 3,
        Host = 4,
        SessionSubmit = 5,
        SessionApprove = 6,
        AttendConference = 7,
        ManageConference = 8
    }

    public class ConferenceAuthorizeAttribute : AuthorizeAttributeBase, IOverrideDefaultAuthLevel
    {
        public SecurityAccessLevel SecurityLevel { get; set; }
        public UserInfo User { get; set; }

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
            if (SecurityLevel == SecurityAccessLevel.Anonymous)
            {
                return true;
            }
            User = HttpContextSource.Current.Request.IsAuthenticated ? UserController.Instance.GetCurrentUserInfo() : new UserInfo();
            ContextSecurity security = new ContextSecurity(context.ActionContext.Request.FindModuleInfo());
            switch (SecurityLevel)
            {
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
                case SecurityAccessLevel.SessionApprove:
                    return security.CanApproveSessions;
                case SecurityAccessLevel.AttendConference:
                    return security.CanAttend;
                case SecurityAccessLevel.ManageConference:
                    return security.CanManage;
            }
            return false;
        }
    }
}
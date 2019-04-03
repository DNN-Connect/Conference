using System.Linq;
using DotNetNuke.Entities.Modules;
using DotNetNuke.Entities.Portals;
using DotNetNuke.Entities.Users;
using DotNetNuke.Security;
using DotNetNuke.Security.Permissions;

namespace Connect.DNN.Modules.Conference.Common
{
    public class ContextSecurity
    {
        public bool CanView { get; set; }
        public bool CanEdit { get; set; }
        public bool CanSubmitSessions { get; set; }
        public bool CanAttend { get; set; }
        public bool CanManage { get; set; }
        public bool IsAdmin { get; set; }
        private UserInfo user { get; set; }
        public int UserId
        {
            get
            {
                return user.UserID;
            }
        }

        #region ctor
        public ContextSecurity(ModuleInfo objModule)
        {
            user = UserController.Instance.GetCurrentUserInfo();
            if (user.IsSuperUser)
            {
                CanView = CanEdit = CanSubmitSessions = CanAttend = CanManage = IsAdmin = true;
            }
            else
            {
                IsAdmin = PortalSecurity.IsInRole(PortalSettings.Current.AdministratorRoleName);
                if (IsAdmin)
                {
                    CanView = CanEdit = CanSubmitSessions = CanAttend = CanManage = true;
                }
                else
                {
                    CanView = ModulePermissionController.CanViewModule(objModule);
                    CanEdit = ModulePermissionController.HasModulePermission(objModule.ModulePermissions, "EDIT");
                    CanSubmitSessions = ModulePermissionController.HasModulePermission(objModule.ModulePermissions, "SESSIONSUBMIT");
                    CanAttend = ModulePermissionController.HasModulePermission(objModule.ModulePermissions, "CANATTEND");
                    CanManage = ModulePermissionController.HasModulePermission(objModule.ModulePermissions, "MANAGE");
                }
            }
        }
        #endregion

        public bool IsPresenter(int sessionId)
        {
            var presenters = Connect.Conference.Core.Repositories.SessionSpeakerRepository.Instance.GetSessionSpeakersBySession(sessionId);
            return presenters.Where(p => p.SpeakerId == user.UserID).Count() > 0;
        }

        public int GoingToConferenceStatus(int conferenceId)
        {
            var a = Connect.Conference.Core.Repositories.AttendeeRepository.Instance.GetAttendee(conferenceId, UserId);
            if (a == null)
            {
                return -1;
            }
            else
            {
                return a.Status;
            }
        }

        public new string ToString()
        {
            return string.Format($"UserId: {UserId}, CanView: {CanView}, CanEdit: {CanEdit}, CanSubmitSessions: {CanSubmitSessions}, CanAttend: {CanAttend}, CanManage: {CanManage}, IsAdmin: {IsAdmin}");
        }

    }
}
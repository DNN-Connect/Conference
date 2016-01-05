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
        public bool CanApproveSessions { get; set; }
        public bool CanAttend { get; set; }
        public bool CanManage { get; set; }
        public bool IsAdmin { get; set; }

        #region ctor
        public ContextSecurity(ModuleInfo objModule)
        {
            if (UserController.Instance.GetCurrentUserInfo().IsSuperUser)
            {
                CanView = CanEdit = CanSubmitSessions = CanApproveSessions = CanAttend = CanManage = IsAdmin = true;
            }
            else
            {
                IsAdmin = PortalSecurity.IsInRole(PortalSettings.Current.AdministratorRoleName);
                if (IsAdmin)
                {
                    CanView = CanEdit = CanSubmitSessions = CanApproveSessions = CanAttend = CanManage = true;
                }
                else
                {
                    CanView = ModulePermissionController.CanViewModule(objModule);
                    CanEdit = ModulePermissionController.HasModulePermission(objModule.ModulePermissions, "EDIT");
                    CanSubmitSessions = ModulePermissionController.HasModulePermission(objModule.ModulePermissions, "SESSIONSUBMIT");
                    CanApproveSessions = ModulePermissionController.HasModulePermission(objModule.ModulePermissions, "SESSIONAPPROVE");
                    CanAttend = ModulePermissionController.HasModulePermission(objModule.ModulePermissions, "CANATTEND");
                    CanManage = ModulePermissionController.HasModulePermission(objModule.ModulePermissions, "MANAGE");
                }
            }
        }
        #endregion

    }
}
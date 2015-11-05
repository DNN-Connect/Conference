using DotNetNuke.Entities.Modules;
using DotNetNuke.Entities.Portals;
using DotNetNuke.Security;
using DotNetNuke.Security.Permissions;

namespace Connect.Conference.Core.Common
{
    public class ContextSecurity
    {
        public bool CanView { get; set; }
        public bool CanEdit { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsSpeaker { get; set; }
        public bool IsAttendee { get; set; }
        public bool CanSubmit { get; set; }

        #region ctor
        public ContextSecurity(ModuleInfo objModule)
        {
            CanView = ModulePermissionController.CanViewModule(objModule);
            CanEdit = ModulePermissionController.HasModulePermission(objModule.ModulePermissions, "EDIT");
            CanSubmit = ModulePermissionController.HasModulePermission(objModule.ModulePermissions, "SESSIONSUBMIT");
            IsAdmin = PortalSecurity.IsInRole(PortalSettings.Current.AdministratorRoleName);
            // todo: speaker and attendee test
        }
        #endregion

    }
}
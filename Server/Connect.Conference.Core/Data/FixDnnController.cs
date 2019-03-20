using System;

namespace Connect.Conference.Core.Data
{
    public class FixDnnController
    {
        public static void SetUserProfileProperty(int portalId, int userId, string propertyName, string propertyValue)
        {
            var ppd = DotNetNuke.Entities.Profile.ProfileController.GetPropertyDefinitionByName(portalId, propertyName);
            if (ppd == null) return;
            DotNetNuke.Data.DataProvider.Instance().UpdateProfileProperty(-1, userId, ppd.PropertyDefinitionId, propertyValue, 
                (int)ppd.ProfileVisibility.VisibilityMode, ppd.ProfileVisibility.ExtendedVisibilityString(), DateTime.Now);
        }
    }
}

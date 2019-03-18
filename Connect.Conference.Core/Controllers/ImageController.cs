using DotNetNuke.Common.Utilities;
using System;
using System.Collections.Generic;

namespace Connect.Conference.Core.Controllers
{
    public class ImageController
    {
        internal const string UserIdListToClearDiskImageCacheKey = "UserIdListToClearDiskImage_{0}";
        public static void ClearUserImageCache(int portalId, int userId)
        {
            var cacheKey = string.Format(UserIdListToClearDiskImageCacheKey, portalId);
            Dictionary<int, DateTime> userIds;
            if ((userIds = DataCache.GetCache<Dictionary<int, DateTime>>(cacheKey)) == null)
                userIds = new Dictionary<int, DateTime>();
            //Add the userid to the clear cache list, if not already in the list.
            if (userIds.ContainsKey(userId)) userIds.Remove(userId);
            userIds.Add(userId, DateTime.UtcNow);
            DataCache.SetCache(cacheKey, userIds);
        }
    }
}

using DotNetNuke.Entities.Portals;
using System.IO;

namespace Connect.Conference.Core.Models.Conferences
{
    public static class Extensions
    {
        public static string GetLogo(this ConferenceBase conference, PortalSettings portal, int size)
        {
            var folderName = string.Format("{0}\\{1}", portal.HomeDirectoryMapPath,
                    Common.Globals.GetConferenceImagePath(conference.ConferenceId, "\\")
                    );
            if (!Directory.Exists(folderName))
            {
                return "";
            }
            var folder = new DirectoryInfo(folderName);
            var files = folder.GetFiles(size.ToString() + ".*");
            if (files.Length > 0)
            {
                return files[0].FullName;
            }
            files = folder.GetFiles("original.*");
            if (files.Length == 0)
            {
                return "";
            }
            // resize logic
            var ext = Path.GetExtension(files[0].Name);
            using (var sr = new FileStream(files[0].FullName, FileMode.Open, FileAccess.Read))
            {
                var sizedContent = DotNetNuke.Common.Utilities.ImageUtils.CreateImage(sr, size, size, Path.GetExtension(files[0].Name));
                sizedContent.Seek(0, SeekOrigin.Begin);
                using (var sw = new FileStream(string.Format("{0}{1}{2}", folderName, size, ext), FileMode.OpenOrCreate, FileAccess.Write))
                {
                    sizedContent.CopyTo(sw);
                }
            }
            return string.Format("{0}{1}{2}", folderName, size, ext);
        }
        public static void ClearLogos(this ConferenceBase conference, PortalSettings portal)
        {
            var folderName = string.Format("{0}\\{1}", portal.HomeDirectoryMapPath,
                    Common.Globals.GetConferenceImagePath(conference.ConferenceId, "\\")
                    );
            if (!Directory.Exists(folderName))
            {
                return;
            }
            var folder = new DirectoryInfo(folderName);
            var files = Directory.GetFiles(folderName, "*.*");
            foreach (var f in files)
            {
                try
                {
                    File.Delete(f);
                }
                catch (System.Exception)
                {
                }
            }
        }
        public static void SaveLogo(this ConferenceBase conference, PortalSettings portal, Stream logo, string extension)
        {
            conference.ClearLogos(portal);
            var folderName = string.Format("{0}\\{1}", portal.HomeDirectoryMapPath,
                    Common.Globals.GetConferenceImagePath(conference.ConferenceId, "\\")
                    );
            if (!Directory.Exists(folderName))
            {
                Directory.CreateDirectory(folderName);
            }
            using (var sw = new FileStream(string.Format("{0}original{1}", folderName, extension), FileMode.OpenOrCreate, FileAccess.Write))
            {
                logo.CopyTo(sw);
            }
        }
    }
}

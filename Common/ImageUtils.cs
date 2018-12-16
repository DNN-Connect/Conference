using DotNetNuke.Services.FileSystem;
using System.IO;

namespace Connect.DNN.Modules.Conference.Common
{
    public class ImageUtils
    {
        public static IFileInfo SaveUserProfilePic(int portalId, int userId, string image, int editedByUserId)
        {
            byte[] imgData = System.Convert.FromBase64String(image.Replace("data:image/png;base64,", string.Empty));
            var ha = new System.Security.Cryptography.SHA1CryptoServiceProvider();
            var hashData = ha.ComputeHash(imgData);
            var hash = System.BitConverter.ToString(hashData).Replace("-", "").Substring(0, 10).ToLower();
            var fileName = hash + ".png";
            var contentType = "image/png";
            var user = DotNetNuke.Entities.Users.UserController.GetUserById(portalId, userId);
            var userFolder = FolderManager.Instance.GetUserFolder(user);
            IFileInfo file = null;
            using (var memStream = new MemoryStream())
            {
                using (BinaryWriter bw = new BinaryWriter(memStream))
                {
                    bw.Write(imgData);
                    memStream.Seek(0, SeekOrigin.Begin);
                    file = FileManager.Instance.AddFile(userFolder, fileName, memStream, true, false, contentType, editedByUserId);
                    bw.Close();
                    CreateThumbnails(file.FileId);
                }
            }
            return file;
        }

        private static void CreateThumbnails(int fileId)
        {
            CreateThumbnail(fileId, "l", 64, 64);
            CreateThumbnail(fileId, "s", 50, 50);
            CreateThumbnail(fileId, "xs", 32, 32);
        }

        private static void CreateThumbnail(int fileId, string type, int width, int height)
        {
            var file = FileManager.Instance.GetFile(fileId);
            if (file != null)
            {
                var folder = FolderManager.Instance.GetFolder(file.FolderId);
                var extension = "." + file.Extension;
                var sizedPhoto = file.FileName.Replace(extension, "_" + type + extension);
                if (!FileManager.Instance.FileExists(folder, sizedPhoto))
                {
                    using (var content = FileManager.Instance.GetFileContent(file))
                    {
                        var sizedContent = DotNetNuke.Common.Utilities.ImageUtils.CreateImage(content, height, width, extension);

                        FileManager.Instance.AddFile(folder, sizedPhoto, sizedContent);
                    }
                }
            }
        }
    }
}
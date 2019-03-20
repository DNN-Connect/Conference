using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DotNetNuke.Web.Api;
using Connect.DNN.Modules.Conference.Common;
using System.Web;
using Newtonsoft.Json;
using System.Collections.Generic;
using Connect.Conference.Core.Repositories;
using DotNetNuke.Entities.Host;
using Connect.Conference.Core.Models.SessionResources;
using System.Text.RegularExpressions;

namespace Connect.DNN.Modules.Conference.Api
{

    public partial class SessionResourcesController : ConferenceApiController
    {

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.SessionSubmit)]
        public HttpResponseMessage Upload(int conferenceId, int id)
        {
            if (!ConferenceModuleContext.Security.CanManage)
            {
                if (!ConferenceModuleContext.Security.IsPresenter(id))
                {
                    return AccessViolation("You are not allowed to upload content for this session");
                }
            }
            HttpPostedFile postedFile = HttpContext.Current.Request.Files["resource"];
            var fileName = System.IO.Path.GetFileName(postedFile.FileName).RemoveIllegalCharacters();
            var extension = System.IO.Path.GetExtension(fileName);
            var allowed = !string.IsNullOrEmpty(extension)
                   && Host.AllowedExtensionWhitelist.IsAllowedExtension(extension)
                   && !DotNetNuke.Common.Globals.FileExtensionRegex.IsMatch(fileName);
            if (!allowed)
            {
                return AccessViolation("This file is not allowed. Check allowed file types for this site.");
            }
            if (postedFile.ContentLength > 50000000)
            {
                return ServiceError("File too big (more that 50 Mb)");
            }
            var contentType = Connect.Conference.Core.Common.ResourceType.Other;
            switch (extension.ToLower())
            {
                case ".ppt":
                case ".pptx":
                    contentType = Connect.Conference.Core.Common.ResourceType.Powerpoint;
                    break;
                case ".zip":
                case ".7z":
                    contentType = Connect.Conference.Core.Common.ResourceType.CodeZip;
                    break;
            }
            var exists = false;
            foreach (var r in SessionResourceRepository.Instance.GetSessionResourcesBySession(id))
            {
                if (r.ResourceLink == fileName)
                {
                    exists = true;
                }
            }
            if (!exists)
            {
                var resource = new SessionResourceBase();
                resource.SessionId = id;
                resource.ResourceDescription = fileName;
                resource.ResourceLink = fileName;
                resource.ResourceType = (int)contentType;
                resource.Visibility = 1;
                SessionResourceRepository.Instance.AddSessionResource(ref resource, UserInfo.UserID);
            }
            var path = PortalSettings.HomeDirectoryMapPath + "\\" + Connect.Conference.Core.Common.Globals.GetSessionResourcesPath(conferenceId, id, "\\");
            if (!System.IO.Directory.Exists(path))
            {
                System.IO.Directory.CreateDirectory(path);
            }
            postedFile.SaveAs(path + fileName);
            return Request.CreateResponse(HttpStatusCode.OK, SessionResourceRepository.Instance.GetSessionResourcesBySession(id));
        }

        public class AddDTO
        {
            public string url { get; set; }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.SessionSubmit)]
        public HttpResponseMessage Add(int conferenceId, int id, [FromBody]AddDTO data)
        {
            if (!ConferenceModuleContext.Security.CanManage)
            {
                if (!ConferenceModuleContext.Security.IsPresenter(id))
                {
                    return AccessViolation("You are not allowed to add content for this session");
                }
            }
            var url = data.url;
            url = DotNetNuke.Common.Globals.AddHTTP(url);
            if (!url.IsValidUrl())
            {
                return ServiceError("The specified url is invalid or the server does not respond");
            }
            var contentType = Connect.Conference.Core.Common.ResourceType.Hyperlink;
            var m = Regex.Match(url, "(?i)https?://(www\\.youtube\\.com|youtu\\.be)/(watch\\?v=)?([^\\?&]+)(?-i)");
            if (m.Success)
            {
                contentType = Connect.Conference.Core.Common.ResourceType.YouTube;
                url = m.Groups[3].Value;
            }
            m = Regex.Match(url, "(?i)https?://vimeo\\.com/(\\d+)(?-i)");
            if (m.Success)
            {
                contentType = Connect.Conference.Core.Common.ResourceType.Vimeo;
                url = m.Groups[1].Value;
            }
            m = Regex.Match(url, "(?i)https?://channel9\\.msdn\\.com/(.+)(?-i)");
            if (m.Success)
            {
                contentType = Connect.Conference.Core.Common.ResourceType.Channel9;
                url = m.Groups[1].Value;
            }
            var resource = new SessionResourceBase();
            resource.SessionId = id;
            resource.ResourceDescription = url;
            resource.ResourceLink = url;
            resource.ResourceType = (int)contentType;
            resource.Visibility = 1;
            SessionResourceRepository.Instance.AddSessionResource(ref resource, UserInfo.UserID);
            return Request.CreateResponse(HttpStatusCode.OK, SessionResourceRepository.Instance.GetSessionResourcesBySession(id));
        }

        public class EditDTO
        {
            public SessionResourceBase SessionResource { get; set; }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.ManageConference)]
        public HttpResponseMessage Approve(int conferenceId, int id, [FromBody]EditDTO data)
        {
            var resource = SessionResourceRepository.Instance.GetSessionResource(id, data.SessionResource.SessionResourceId);
            resource.Visibility = (resource.Visibility == 0) ? 1 : 0;
            SessionResourceRepository.Instance.UpdateSessionResource(resource.GetSessionResourceBase(), UserInfo.UserID);
            return Request.CreateResponse(HttpStatusCode.OK, SessionResourceRepository.Instance.GetSessionResourcesBySession(id));
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.SessionSubmit)]
        public HttpResponseMessage Delete(int conferenceId, int id, [FromBody]EditDTO data)
        {
            if (!ConferenceModuleContext.Security.CanManage)
            {
                if (!ConferenceModuleContext.Security.IsPresenter(id))
                {
                    return AccessViolation("You are not allowed to delete content for this session");
                }
            }
            var resource = SessionResourceRepository.Instance.GetSessionResource(id, data.SessionResource.SessionResourceId);
            SessionResourceRepository.Instance.DeleteSessionResource(resource.GetSessionResourceBase());
            return Request.CreateResponse(HttpStatusCode.OK, SessionResourceRepository.Instance.GetSessionResourcesBySession(id));
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.SessionSubmit)]
        public HttpResponseMessage Edit(int conferenceId, int id, [FromBody]EditDTO data)
        {
            if (!ConferenceModuleContext.Security.CanManage)
            {
                if (!ConferenceModuleContext.Security.IsPresenter(id))
                {
                    return AccessViolation("You are not allowed to edit content for this session");
                }
            }
            var resource = SessionResourceRepository.Instance.GetSessionResource(id, data.SessionResource.SessionResourceId);
            resource.ResourceDescription = data.SessionResource.ResourceDescription;
            SessionResourceRepository.Instance.UpdateSessionResource(resource.GetSessionResourceBase(), UserInfo.UserID);
            return Request.CreateResponse(HttpStatusCode.OK, SessionResourceRepository.Instance.GetSessionResourcesBySession(id));
        }

    }
}


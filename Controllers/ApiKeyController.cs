using Connect.Conference.Core.Models.ApiKeys;
using Connect.Conference.Core.Repositories;
using Connect.DNN.Modules.Conference.Common;
using DotNetNuke.Common;
using System;
using System.Web.Mvc;

namespace Connect.DNN.Modules.Conference.Controllers
{
    public class ApiKeyController : ConferenceMvcController
    {
        private readonly IApiKeyRepository _repository;

        public ApiKeyController() : this(ApiKeyRepository.Instance) { }

        public ApiKeyController(IApiKeyRepository repository)
        {
            Requires.NotNull(repository);
            _repository = repository;
        }

        [HttpGet]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.ManageConference)]
        public ActionResult Keys(int conferenceId)
        {
            DotNetNuke.Framework.ServicesFramework.Instance.RequestAjaxAntiForgerySupport();
            return View(ConferenceRepository.Instance.GetConference(PortalSettings.PortalId, conferenceId));
        }

        public class NewKeyDTO
        {
            public string Expires { get; set; }
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Keys(int conferenceId, NewKeyDTO data)
        {
            var newKey = new ApiKeyBase()
            {
                ConferenceId = conferenceId,
                ApiKey = Guid.NewGuid().ToString("N"),
                CreatedByUserID = User.UserID,
                CreatedOnDate = DateTime.Now
            };
            if (!string.IsNullOrEmpty(data.Expires))
            {
                DateTime expiryDate;
                if (DateTime.TryParse(data.Expires, out expiryDate)) newKey.Expires = expiryDate;
            }
            ApiKeyRepository.Instance.AddApiKey(ref newKey);
            DotNetNuke.Framework.ServicesFramework.Instance.RequestAjaxAntiForgerySupport();
            return View(ConferenceRepository.Instance.GetConference(PortalSettings.PortalId, conferenceId));
        }
        public class DeleteDTO
        {
            public string ApiKey { get; set; }
        }
        [HttpGet]
        public ActionResult Delete(string apiKey)
        {
            var key = ApiKeyRepository.Instance.GetApiKey(apiKey);
            if (key.CreatedByUserID == User.UserID)
            {
                ApiKeyRepository.Instance.DeleteApiKey(apiKey);
            }
            return Redirect(HttpContext.Request.UrlReferrer.PathAndQuery);
        }
    }
}
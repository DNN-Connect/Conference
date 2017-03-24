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
        public ActionResult Keys()
        {
            DotNetNuke.Framework.ServicesFramework.Instance.RequestAjaxAntiForgerySupport();
            return View();
        }
        public class NewKeyDTO
        {
            public string Expires { get; set; }
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Keys(NewKeyDTO data)
        {
            var newKey = new ApiKeyBase();
            if (!string.IsNullOrEmpty(data.Expires))
            {
                DateTime expiryDate;
                if (DateTime.TryParse(data.Expires, out expiryDate)) newKey.Expires=expiryDate;
            }
            newKey.ApiKey = Guid.NewGuid().ToString("N");
            newKey.CreatedByUserID = User.UserID;
            newKey.CreatedOnDate = DateTime.Now;
            ApiKeyRepository.Instance.AddApiKey(ref newKey);
            DotNetNuke.Framework.ServicesFramework.Instance.RequestAjaxAntiForgerySupport();
            return View();
        }
        public class DeleteDTO
        {
            public string ApiKey { get; set; }
        }
        [HttpGet]
        public ActionResult Delete(string apiKey)
        {
            var key = ApiKeyRepository.Instance.GetApiKey(apiKey);
            if (key.CreatedByUserID==User.UserID)
            {
                ApiKeyRepository.Instance.DeleteApiKey(apiKey);
            }
            return RedirectToAction("Keys", "ApiKey");
        }
    }
}
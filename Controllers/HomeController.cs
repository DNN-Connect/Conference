using System.Web.Mvc;
using Connect.DNN.Modules.Conference.Common;

namespace Connect.DNN.Modules.Conference.Controllers
{
    public class HomeController : ConferenceMvcController
    {

        /// <summary>
        /// The Index method is the default Action method
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult Index()
        {
            var conference = Connect.Conference.Core.Repositories.ConferenceRepository.Instance.GetConference(PortalSettings.PortalId, ConferenceModuleContext.Settings.Conference);
            if (conference == null) { conference = new Connect.Conference.Core.Models.Conferences.Conference(); }
            ConferenceModuleContext.AddBootstrapCss();
            return View(ConferenceModuleContext.Settings.View, conference);
        }
    }
}
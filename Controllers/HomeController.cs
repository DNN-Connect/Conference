using System.Linq;
using System.Web.Mvc;
using DotNetNuke.Common;
using DotNetNuke.Entities.Modules.Actions;
using DotNetNuke.Web.Mvc.Framework.ActionFilters;
using DotNetNuke.Web.Mvc.Framework.Controllers;
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
            // var conference = Connect.Conference.Core.Controllers.ConferencesController.GetConference(PortalSettings.PortalId, Settings.Conference);
            var conference = Connect.Conference.Core.Repositories.ConferenceRepository.Instance.GetConference(PortalSettings.PortalId, Settings.Conference);
            if (conference == null) { conference = new Connect.Conference.Core.Models.Conferences.Conference(); }
            return View(Settings.View, conference);
        }
    }
}
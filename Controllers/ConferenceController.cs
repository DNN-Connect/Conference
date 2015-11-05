using System.Linq;
using System.Web.Mvc;
using DotNetNuke.Common;
using DotNetNuke.Entities.Modules.Actions;
using DotNetNuke.Web.Mvc.Framework.ActionFilters;
using DotNetNuke.Web.Mvc.Framework.Controllers;
using Connect.DNN.Modules.Conference.Common;

namespace Connect.DNN.Modules.Conference.Controllers
{
    public class ConferenceController : ConferenceMvcController
    {
        [HttpGet]
        public ActionResult Edit()
        {
            var conference = Connect.Conference.Core.Controllers.ConferencesController.GetConference(PortalSettings.PortalId, Settings.Conference);
            if (conference == null) { conference = new Connect.Conference.Core.Models.Conferences.Conference(); }
            return View(conference);
        }

    }
}
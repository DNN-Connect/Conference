using Connect.DNN.Modules.Conference.Common;
using DotNetNuke.Common.Lists;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;

namespace Connect.DNN.Modules.Conference.Api
{

  public partial class ModuleController : ConferenceApiController
  {
    [HttpGet()]
    [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.ManageConference)]
    public HttpResponseMessage SearchUsers(int conferenceId, string field, string search)
    {
      return Request.CreateResponse(HttpStatusCode.OK, Connect.Conference.Core.Common.Globals.SearchUsers(PortalSettings.PortalId, field, search));
    }

    [HttpGet]
    [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.View)]
    public HttpResponseMessage CountryList()
    {
      var res = CachedCountryList.GetCountryList(Thread.CurrentThread.CurrentCulture.Name)
        .Values;
      return Request.CreateResponse(HttpStatusCode.OK, res);
    }
  }
}


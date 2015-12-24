
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DotNetNuke.Web.Api;
using Connect.DNN.Modules.Conference.Common;
using Newtonsoft.Json;
using Connect.Conference.Core.Repositories;

namespace Connect.DNN.Modules.Conference.Api
{

	public partial class LocationsController : ConferenceApiController
	{

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.Edit)]
        public HttpResponseMessage Reorder([NakedBody] string raw)
        {
            var data = JsonConvert.DeserializeObject<ReorderDto>(raw);
            ILocationRepository _repository = LocationRepository.Instance;
            foreach (Order no in data.NewOrder)
            {
                var location = _repository.GetLocation(data.Id, no.id);
                if (location != null)
                {
                    location.Sort = no.order;
                    _repository.UpdateLocation(location.GetLocationBase(), UserInfo.UserID);
                }
            }
            return Request.CreateResponse(HttpStatusCode.OK, "");
        }

    }
}


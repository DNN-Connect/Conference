using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.IO;
using Connect.Conference.Core.Repositories;
using Connect.DNN.Modules.Conference.Common;
using Connect.Conference.Core.Models.Sponsors;
using DotNetNuke.Web.Api;
using System.Net.Http.Headers;
using System.Web;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace Connect.DNN.Modules.Conference.Api
{
	public partial class SponsorsController : ConferenceApiController
	{
        [HttpGet]
        [AllowAnonymous]
        public HttpResponseMessage Image(int conferenceId, int id, int size)
        {
            var sponsor = SponsorRepository.Instance.GetSponsor(id);
            var imageName = sponsor.GetLogo(PortalSettings, size);
            if (imageName == "")
            {
                imageName = string.Format("{0}images\\no-content.png", DotNetNuke.Common.Globals.ApplicationMapPath);
            }
            var res = new HttpResponseMessage(HttpStatusCode.OK);
            var mem = new MemoryStream();
            using (var sr = new FileStream(imageName, FileMode.Open, FileAccess.Read))
            {
                sr.CopyTo(mem);
            }
            mem.Seek(0, SeekOrigin.Begin);
            res.Content = new StreamContent(mem);
            res.Content.Headers.ContentType = new MediaTypeHeaderValue("image/" + Path.GetExtension(imageName));
            res.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
            {
                FileName = Path.GetFileName(imageName)
            };
            return res;
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.ManageConference)]
        public HttpResponseMessage Reorder(int conferenceId)
        {
            var raw = new StreamReader(HttpContext.Current.Request.InputStream).ReadToEnd();
            var data = JsonConvert.DeserializeObject<List<Order>>(raw);
            ISponsorRepository _repository = SponsorRepository.Instance;
            foreach (Order no in data)
            {
                var sponsor = _repository.GetSponsor(no.id);
                if (sponsor != null)
                {
                    sponsor.ViewOrder = no.order;
                    _repository.UpdateSponsor(sponsor.GetSponsorBase(), UserInfo.UserID);
                }
            }
            return Request.CreateResponse(HttpStatusCode.OK, "");
        }

    }
}


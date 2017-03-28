using Connect.DNN.Modules.Conference.Common;
using Connect.DNN.Modules.Conference.Integration.NBright;
using DotNetNuke.Web.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Connect.DNN.Modules.Conference.Api
{
    public class NBrightController : ConferenceApiController
    {
        [HttpGet]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.View)]
        public HttpResponseMessage Details(int conferenceId, int itemId)
        {
            return Request.CreateResponse(HttpStatusCode.OK, NBrightRepository.Instance.GetOrderItems(conferenceId, itemId));
        }

        public class OrderStatusDTO
        {
            public int ItemId { get; set; }
            public int Status { get; set; }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.View)]
        public HttpResponseMessage OrderStatus(OrderStatusDTO data)
        {
            //
            return Request.CreateResponse(HttpStatusCode.OK, NBrightRepository.Instance.GetOrders().FirstOrDefault(o => o.OrderNr == data.OrderNr));

        }

    }
}
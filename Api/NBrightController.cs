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
using Nevoweb.DNN.NBrightBuy.Components;
using Connect.Conference.Core.Controllers;
using Connect.Conference.Core.Repositories;

namespace Connect.DNN.Modules.Conference.Api
{
    public class NBrightController : ConferenceApiController
    {
        [HttpGet]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.View)]
        public HttpResponseMessage Details(int conferenceId, int id)
        {
            return Request.CreateResponse(HttpStatusCode.OK, NBrightRepository.Instance.GetOrderItems(conferenceId, id));
        }

        [HttpGet]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.View)]
        public HttpResponseMessage Audit(int id)
        {
            return Request.CreateResponse(HttpStatusCode.OK, NBrightRepository.Instance.GetOrderAudit(id));
        }

        public class OrderStatusDTO
        {
            public int ItemId { get; set; }
            public int Status { get; set; }
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.ManageConference)]
        public HttpResponseMessage OrderStatus(OrderStatusDTO data)
        {
            var ordData = new OrderData(data.ItemId);
            ordData.OrderStatus = data.Status.ToString("D3");
            ordData.Save();
            return Request.CreateResponse(HttpStatusCode.OK, NBrightRepository.Instance.GetOrders(PortalSettings.PortalId).FirstOrDefault(o => o.ItemId == data.ItemId));
        }

        public class AuditDTO
        {
            public string Message { get; set; }
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.ManageConference)]
        public HttpResponseMessage AddAudit(int id, AuditDTO data)
        {
            var ordData = new OrderData(id);
            ordData.AddAuditMessage(data.Message, "Conference", UserInfo.DisplayName, "False");
            ordData.Save();
            return Request.CreateResponse(HttpStatusCode.OK, NBrightRepository.Instance.GetOrders(PortalSettings.PortalId).FirstOrDefault(o => o.ItemId == id));
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ConferenceAuthorize(SecurityLevel = SecurityAccessLevel.ManageConference)]
        public HttpResponseMessage Participant(int conferenceId, int id, NBrightOrderItem data)
        {
            if (data.AttendeeUserId == null)
            {
                var userId = data.UserID;
                if (userId == null) userId = data.AlternativeUserId;
                if (userId == null) userId = -1;
                ConferenceController.AddAttendee(PortalSettings.PortalId,
                    conferenceId,
                    (int)userId,
                    data.Email,
                    data.FirstName,
                    data.LastName,
                    string.Format("{0} {1}", data.FirstName, data.LastName),
                    data.Company,
                    UserInfo.UserID);
            }
            else
            {
                AttendeeRepository.Instance.DeleteAttendee(conferenceId, (int)data.AttendeeUserId);
            }
            return Request.CreateResponse(HttpStatusCode.OK, NBrightRepository.Instance.GetOrderItems(conferenceId, id));
        }

    }
}
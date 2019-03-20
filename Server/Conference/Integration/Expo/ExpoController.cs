using Connect.Conference.Core.Models.Comments;
using Connect.Conference.Core.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Net;

namespace Connect.DNN.Modules.Conference.Integration.Expo
{
    public class ExpoController
    {
        private const string url = "https://exp.host/--/api/v2/push/send";

        private class Notification
        {
            public string to { get; set; }
            public string title { get; set; }
            public string body { get; set; }
        }

        public static void CheckAndSendNotifications(CommentBase comment)
        {
            var notifications = new List<Notification>();
            switch (comment.Visibility)
            {
                case 0: // just the authors
                case 1: // between authors and managers
                    if (comment.SessionId != -1)
                    {
                        // General comment
                        var speakers = SessionSpeakerRepository.Instance.GetSessionSpeakersBySession(comment.SessionId)
                            .Select(ss => ss.SpeakerId);
                        var attendeesToNotify = AttendeeRepository.Instance.GetAttendeesByConference(comment.ConferenceId)
                            .Where(a => speakers.Contains(a.UserId)
                            && a.UserId != comment.UserId);
                        foreach (var attendee in attendeesToNotify)
                        {
                            notifications.Add(new Notification()
                            {
                                to = attendee.NotificationToken,
                                title = "Conference comment",
                                body = comment.Remarks
                            });
                        }
                    }
                    break;
                case 2: // management comment
                    if (comment.SessionId == -1)
                    {
                        // General comment
                        var attendeesWithToken = AttendeeRepository.Instance.GetAttendeesByConference(comment.ConferenceId)
                            .Where(a => a.HasNotificationToken
                            && a.NotificationToken.StartsWith("ExponentPushToken")
                            && a.UserId != comment.UserId);
                        foreach (var attendee in attendeesWithToken)
                        {
                            notifications.Add(new Notification()
                            {
                                to = attendee.NotificationToken,
                                title = "Conference comment",
                                body = comment.Remarks
                            });
                        }
                    }
                    break;
            }
            if (notifications.Count > 0)
            {
                SendNotifications(notifications);
            }
        }

        private static void SendNotifications(List<Notification> notifications)
        {
            var wr = WebRequest.Create(url) as HttpWebRequest;
            wr.Method = "POST";
            wr.Accept = "application/json";
            wr.Headers.Add("accept-encoding", "gzip, deflate");
            wr.ContentType = "application/json; charset=utf-8";
            using (var streamWriter = new System.IO.StreamWriter(wr.GetRequestStream()))
            {
                streamWriter.Write(Newtonsoft.Json.JsonConvert.SerializeObject(notifications));
                streamWriter.Flush();
            }
            try
            {
                var response = wr.GetResponse();
            }
            catch (System.Exception ex)
            {
                DotNetNuke.Services.Exceptions.Exceptions.LogException(new System.Exception("Error sending Expo notifications", ex));
            }
        }
    }
}
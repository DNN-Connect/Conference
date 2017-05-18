using Connect.Conference.Core.Common;
using Connect.Conference.Core.Repositories;
using System.IO;
using System.Linq;
using System.Text;
using uPLibrary.Networking.M2Mqtt.Messages;

namespace Connect.DNN.Modules.Conference.Integration.Mqtt
{
    public class MqttClient
    {
        private uPLibrary.Networking.M2Mqtt.MqttClient Client { get; set; }
        private Connect.Conference.Core.Models.Conferences.Conference Conference { get; set; }
        private static TextWriter Logger { get; set; }

        public MqttClient(Connect.Conference.Core.Models.Conferences.Conference conference)
        {
            Conference = conference;
            if (!string.IsNullOrEmpty(conference.MqttBroker))
            {
                var filename = string.Format("{0}\\Portals\\_default\\Logs\\Connect.Conference.{1}.{2:yyyy-MM-dd}", DotNetNuke.Common.Globals.ApplicationMapPath, Conference.ConferenceId, System.DateTime.Now);
                var i = 0;
                while (true)
                {
                    try
                    {
                        if (Logger == null) Logger = new StreamWriter(string.Format("{0}-{1}.resources", filename, i), true, Encoding.UTF8);
                        break;
                    }
                    catch (System.Exception)
                    {
                    }
                    i++;
                }
                string clientId = string.Format("Connect.Conference.{0}.{1}", DotNetNuke.Entities.Host.Host.GUID, conference.ConferenceId);
                Client = new uPLibrary.Networking.M2Mqtt.MqttClient(conference.MqttBroker);
                Client.MqttMsgPublishReceived += client_MqttMsgPublishReceived;
                if (string.IsNullOrEmpty(conference.MqttBrokerUsername))
                {
                    Client.Connect(clientId);
                }
                else
                {
                    Client.Connect(clientId, conference.MqttBrokerUsername, conference.MqttBrokerPassword, false, 1000);
                }
                Client.Subscribe(new string[] { Conference.BaseTopicPath + "rfid/room/+" }, new byte[] { MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE });
            }
        }

        private void client_MqttMsgPublishReceived(object sender, MqttMsgPublishEventArgs e)
        {
            Log(e);
            var msg = Encoding.UTF8.GetString(e.Message);
            var topic = e.Topic.Substring(Conference.BaseTopicPath.UnNull().Length);
            topic = topic.TrimStart('/');
            var topics = topic.Split('/');
            if (topics.Length == 0) return;
            try
            {
                switch (topics[0])
                {
                    case "rfid":
                        if (topics[1] == "room")
                        {
                            var roomId = int.Parse(topics[2]);
                            var checkin = Newtonsoft.Json.JsonConvert.DeserializeObject<RfidMessage>(msg);
                            if (!string.IsNullOrEmpty(Conference.TimeZoneId))
                            {
                                var tz = System.TimeZoneInfo.GetSystemTimeZones().FirstOrDefault(t => t.Id == Conference.TimeZoneId);
                                if (tz != null)
                                {
                                    var offset = tz.GetUtcOffset(checkin.checkin);
                                    checkin.checkin = checkin.checkin.Add(offset);
                                }
                            }
                            var attendee = AttendeeRepository.Instance.GetAttendeeByCode(Conference.ConferenceId, checkin.cardId);
                            if (attendee != null)
                            {
                                var session = SessionRepository.Instance.GetSession(Conference.ConferenceId, roomId, checkin.checkin.AddMinutes(15));
                                if (session == null)
                                {
                                    session = SessionRepository.Instance.GetSession(Conference.ConferenceId, roomId, checkin.checkin);
                                }
                                if (session != null)
                                {
                                    SessionAttendeeRepository.Instance.SetSessionAttendee(session.SessionId, attendee.UserId);
                                    SendPresence(roomId, session.LocationName, session.Title, attendee.DisplayName);
                                }
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
            catch (System.Exception ex)
            {
                Log("Error: {0}", ex.Message);
                Log(ex.StackTrace);
                throw;
            }
        }

        public void SendPresence(int roomId, string locationName, string sessionName, string userDisplayName)
        {
            if (Client.IsConnected)
            {
                var att = new AttendanceMessage()
                {
                    LocationName = locationName,
                    SessionName = sessionName,
                    Attendee = userDisplayName
                };
                var txt = Newtonsoft.Json.JsonConvert.SerializeObject(att);
                var msg = Encoding.UTF8.GetBytes(txt);
                var topic = Conference.BaseTopicPath;
                if (topic.Length > 0) topic += "/";
                topic += string.Format("checkin/room/{0}");
                Log("Sending Message:");
                Log("Topic: {0}", topic);
                Log("Message: {0}", txt);
                Client.Publish(topic, msg, 0, false);
            }
        }

        private void Log(MqttMsgPublishEventArgs incomingMessage)
        {
            Log("Message Received:");
            Log("QoS and Topic: {0} {1}", incomingMessage.QosLevel, incomingMessage.Topic);
            Log("Content: {0}", Encoding.UTF8.GetString(incomingMessage.Message));
        }
        private void Log(string format, params object[] args)
        {
            Log(string.Format(format, args));
        }
        private void Log(string logText)
        {
            if (Logger == null) return;
            try
            {
                Logger.WriteLine(string.Format("{0:HH:mm:ss} {1}", System.DateTime.Now, logText));
                Logger.Flush();
            }
            catch (System.Exception)
            {
            }
        }
    }
}
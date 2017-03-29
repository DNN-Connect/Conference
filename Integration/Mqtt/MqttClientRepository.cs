using System.Collections.Generic;

namespace Connect.DNN.Modules.Conference.Integration.Mqtt
{
    public sealed class MqttClientRepository
    {
        private static MqttClientRepository instance = null;

        public static MqttClientRepository Instance
        {
            get
            {
                return instance;
            }
        }

        static MqttClientRepository()
        {
            instance = new MqttClientRepository();
            instance.MqttClients = new Dictionary<int, MqttClient>();
        }
        private MqttClientRepository()
        {
        }

        private Dictionary<int, MqttClient> MqttClients { get; set; }

        public void EnsureClient(Connect.Conference.Core.Models.Conferences.Conference conference)
        {
            if (!MqttClients.ContainsKey(conference.ConferenceId))
            {
                MqttClients.Add(conference.ConferenceId, new MqttClient(conference));
            }
        }


    }
}
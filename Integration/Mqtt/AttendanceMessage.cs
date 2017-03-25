namespace Connect.DNN.Modules.Conference.Integration.Mqtt
{
    public class AttendanceMessage
    {
        public string LocationName { get; set; }
        public string SessionName { get; set; }
        public string Attendee { get; set; }
    }
}
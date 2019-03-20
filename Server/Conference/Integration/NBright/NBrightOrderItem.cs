namespace Connect.DNN.Modules.Conference.Integration.NBright
{
    public class NBrightOrderItem : NBrightOrder
    {
        public string ProductName { get; set; }
        public float Cost { get; set; }
        public bool Sharing { get; set; }
        public string Gender { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Company { get; set; }
        public string Email { get; set; }
        public System.DateTime Arrival { get; set; }
        public System.DateTime Departure { get; set; }
        public int? UserID { get; set; }
        public int? AttendeeStatus { get; set; }
        public int? AttendeeUserId { get; set; }
        public int? AlternativeUserId { get; set; }
    }
}
namespace Connect.DNN.Modules.Conference.Integration.NBright
{
    public class NBrightOrder
    {
        public int ItemId { get; set; }
        public string OrderedBy { get; set; }
        public string OrderNr { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public int OrderStatus { get; set; }
        public float SubTotal { get; set; }
        public float Discount { get; set; }
        public float Total { get; set; }
        public int NrParticipants { get; set; }
    }
}
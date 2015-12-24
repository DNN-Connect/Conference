using System.Collections.Generic;

namespace Connect.DNN.Modules.Conference.Common
{
    public class Order
    {
        public int id { get; set; }
        public int order { get; set; }
    }
    public class ReorderDto
    {
        public IEnumerable<Order> NewOrder;
    }

}
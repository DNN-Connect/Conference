namespace Connect.Conference.Core.Models
{
    public class SimpleUser
    {
        public int UserId { get; set; }
        public int PortalId { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DisplayName { get; set; }
        public bool IsSuperUser { get; set; }
        public string Email { get; set; }
        public string VanityUrl { get; set; }
    }
}

using DotNetNuke.ComponentModel.DataAnnotations;

namespace Connect.Conference.Core.Models.Sessions
{

    public partial class SessionBase
    {

        [IgnoreColumn]
        public string EditTags { get; set; }

        [IgnoreColumn]
        public string EditTracks { get; set; }

    }
}

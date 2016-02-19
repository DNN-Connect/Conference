using DotNetNuke.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace Connect.Conference.Core.Models.Comments
{

    public partial class Comment : CommentBase
    {

        [IgnoreColumn]
        [DataMember]
        public string ShortDate
        {
            get
            {
                return Datime.ToString("d");
            }
        }

    }
}

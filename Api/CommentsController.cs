using System.Net;
using System.Net.Http;
using System.Web.Http;
using DotNetNuke.Web.Api;
using Connect.DNN.Modules.Conference.Common;
using Connect.Conference.Core.Models.Comments;
using Connect.Conference.Core.Repositories;

namespace Connect.DNN.Modules.Conference.Api
{

    public partial class CommentsController : ConferenceApiController
    {

        #region " Service Methods "
        [HttpPost]
        [DnnModuleAuthorize(AccessLevel = DotNetNuke.Security.SecurityAccessLevel.View)]
        public HttpResponseMessage Add(int conferenceId, [FromBody]CommentBase comment)
        {
            comment.ConferenceId = conferenceId;
            comment.UserId = UserInfo.UserID;
            comment.Datime = System.DateTime.Now;
            CommentRepository.Instance.AddComment(ref comment);
            return Request.CreateResponse(HttpStatusCode.OK, CommentRepository.Instance.GetComment(conferenceId, comment.CommentId).FillStampLine());
        }
        #endregion

    }
}


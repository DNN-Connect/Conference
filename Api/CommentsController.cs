using System.Net;
using System.Net.Http;
using System.Web.Http;
using DotNetNuke.Web.Api;
using Connect.DNN.Modules.Conference.Common;
using Connect.Conference.Core.Models.Comments;
using Connect.Conference.Core.Repositories;
using System.Collections.Generic;

namespace Connect.DNN.Modules.Conference.Api
{

    public partial class CommentsController : ConferenceApiController
    {

        [HttpGet]
        [DnnModuleAuthorize(AccessLevel = DotNetNuke.Security.SecurityAccessLevel.View)]
        public HttpResponseMessage List(int conferenceId, int sessionId, int visibility, int pageIndex, int pageSize)
        {
            switch (visibility)
            {
                case 0: // just the authors
                    if (!ConferenceModuleContext.Security.IsPresenter(sessionId))
                    {
                        return AccessViolation("You need to be a presenter to see this");
                    }
                    break;
                case 1: // between authors and managers
                    if (!(ConferenceModuleContext.Security.IsPresenter(sessionId) | ConferenceModuleContext.Security.CanManage))
                    {
                        return AccessViolation("You need to be a presenter or manager to see this");
                    }
                    break;
            }
            try
            {
                var list = CommentRepository.Instance.GetCommentsBySession(sessionId, visibility, pageIndex, pageSize);
                var res = list.FillStampLines();
                return Request.CreateResponse(HttpStatusCode.OK, res);
            }
            catch
            {
                var res = new List<Comment>();
                return Request.CreateResponse(HttpStatusCode.OK, res);
            }
        }

        [HttpPost]
        [DnnModuleAuthorize(AccessLevel = DotNetNuke.Security.SecurityAccessLevel.View)]
        public HttpResponseMessage Add(int conferenceId, [FromBody]CommentBase comment)
        {
            switch (comment.Visibility)
            {
                case 0: // just the authors
                    if (!ConferenceModuleContext.Security.IsPresenter(comment.SessionId))
                    {
                        return AccessViolation("You need to be a presenter to submit this comment");
                    }
                    break;
                case 1: // between authors and managers
                    if (!(ConferenceModuleContext.Security.IsPresenter(comment.SessionId) | ConferenceModuleContext.Security.CanManage))
                    {
                        return AccessViolation("You need to be a presenter or manager to submit this comment");
                    }
                    break;
                default:
                    if (UserInfo.UserID <= 0)
                    {
                        return AccessViolation("You need to be logged in to submit a comment");
                    }
                    break;
            }
            comment.ConferenceId = conferenceId;
            comment.UserId = UserInfo.UserID;
            comment.Datime = System.DateTime.Now;
            CommentRepository.Instance.AddComment(ref comment);
            return Request.CreateResponse(HttpStatusCode.OK, CommentRepository.Instance.GetComment(conferenceId, comment.CommentId).FillStampLine());
        }

        [HttpPost]
        [DnnModuleAuthorize(AccessLevel = DotNetNuke.Security.SecurityAccessLevel.View)]
        public HttpResponseMessage Delete(int conferenceId, int id)
        {
            var comment = CommentRepository.Instance.GetComment(conferenceId, id);
            if (comment != null)
            {
                if (comment.UserId == UserInfo.UserID | ConferenceModuleContext.Security.CanManage)
                {
                    CommentRepository.Instance.DeleteComment(conferenceId, id);
                }
                else
                {
                    return AccessViolation("You're not allowed to delete this comment");
                }
            }
            return Request.CreateResponse(HttpStatusCode.OK, "");
        }

    }
}


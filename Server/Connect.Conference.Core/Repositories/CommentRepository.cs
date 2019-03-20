using Connect.Conference.Core.Models.Comments;
using DotNetNuke.Collections;
using DotNetNuke.Data;
using DotNetNuke.Framework;
using System.Collections.Generic;

namespace Connect.Conference.Core.Repositories
{

    public partial class CommentRepository : ServiceLocator<ICommentRepository, CommentRepository>, ICommentRepository
    {
        public IEnumerable<Comment> GetNewComments(int sessionId, int visibility, System.DateTime lastCheck)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<Comment>();
                return rep.Find("WHERE SessionId=@0 AND Visibility=@1 AND Datime>@2 ORDER BY Datime DESC", sessionId, visibility, lastCheck);
            }
        }
        public int GetTotalComments(int sessionId, int visibility)
        {
            using (var context = DataContext.Instance())
            {
                return context.ExecuteScalar<int>(System.Data.CommandType.Text, "SELECT COUNT(*) FROM {databaseOwner}{objectQualifier}Connect_Conference_Comments WHERE SessionId=@0 AND Visibility=@1", sessionId, visibility);
            }
        }
        public IPagedList<Comment> GetCommentsBySession(int conferenceId, int sessionId, int visibility, int pageIndex, int pageSize)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<Comment>();
                return rep.Find(pageIndex, pageSize, "WHERE ConferenceId=@0 AND SessionId=@1 AND Visibility=@2 ORDER BY Datime DESC", conferenceId, sessionId, visibility);
            }
        }
        public Comment GetComment(int conferenceId, int commentId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<Comment>();
                return rep.GetById(commentId, conferenceId);
            }
        }
        public void DeleteComment(int conferenceId, int commentId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<CommentBase>();
                rep.Delete("WHERE ConferenceId = @0 AND CommentId = @1", conferenceId, commentId);
            }
        }
        public void DeleteCommentsBySession(int sessionId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<CommentBase>();
                rep.Delete("WHERE SessionId = @0", sessionId);
            }
        }
    }

    public partial interface ICommentRepository
    {
        IEnumerable<Comment> GetNewComments(int sessionId, int visibility, System.DateTime lastCheck);
        int GetTotalComments(int sessionId, int visibility);
        IPagedList<Comment> GetCommentsBySession(int conferenceId, int sessionId, int visibility, int pageIndex, int pageSize);
        Comment GetComment(int conferenceId, int commentId);
        void DeleteComment(int conferenceId, int commentId);
        void DeleteCommentsBySession(int sessionId);
    }
}


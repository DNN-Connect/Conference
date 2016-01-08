using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;
using DotNetNuke.Collections;
using DotNetNuke.Common;
using DotNetNuke.Data;
using DotNetNuke.Framework;
using Connect.Conference.Core.Data;
using Connect.Conference.Core.Models.Comments;

namespace Connect.Conference.Core.Repositories
{

    public class CommentRepository : ServiceLocator<ICommentRepository, CommentRepository>, ICommentRepository
    {
        protected override Func<ICommentRepository> GetFactory()
        {
            return () => new CommentRepository();
        }
        public IEnumerable<Comment> GetComments(int conferenceId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<Comment>();
                return rep.Get(conferenceId);
            }
        }
        public IPagedList<Comment> GetCommentsBySession(int sessionId, int visibility, int pageIndex, int pageSize)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<Comment>();
                return rep.Find(pageIndex, pageSize, "WHERE SessionId=@0 AND Visibility=@1 ORDER BY Datime DESC", sessionId, visibility);
            }
        }
        public IEnumerable<Comment> GetCommentsByUser(int userId)
        {
            using (var context = DataContext.Instance())
            {
                return context.ExecuteQuery<Comment>(System.Data.CommandType.Text,
                    "SELECT * FROM vw_Connect_Conference_Comments WHERE UserId=@0",
                    userId);
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
        public int AddComment(ref CommentBase comment)
        {
            Requires.NotNull(comment);
            Requires.PropertyNotNegative(comment, "ConferenceId");
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<CommentBase>();
                rep.Insert(comment);
            }
            return comment.CommentId;
        }
        public void DeleteComment(CommentBase comment)
        {
            Requires.NotNull(comment);
            Requires.PropertyNotNegative(comment, "CommentId");
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<CommentBase>();
                rep.Delete(comment);
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
        public void UpdateComment(CommentBase comment)
        {
            Requires.NotNull(comment);
            Requires.PropertyNotNegative(comment, "CommentId");
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<CommentBase>();
                rep.Update(comment);
            }
        }
    }

    public interface ICommentRepository
    {
        IEnumerable<Comment> GetComments(int conferenceId);
        IPagedList<Comment> GetCommentsBySession(int sessionId, int visibility, int pageIndex, int pageSize);
        IEnumerable<Comment> GetCommentsByUser(int userId);
        Comment GetComment(int conferenceId, int commentId);
        int AddComment(ref CommentBase comment);
        void DeleteComment(CommentBase comment);
        void DeleteComment(int conferenceId, int commentId);
        void DeleteCommentsBySession(int sessionId);
        void UpdateComment(CommentBase comment);
    }
}


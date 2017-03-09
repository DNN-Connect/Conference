using System;
using System.Collections.Generic;
using System.Linq;
using DotNetNuke.Common;
using DotNetNuke.Data;
using DotNetNuke.Framework;
using Connect.Conference.Core.Models.Comments;

namespace Connect.Conference.Core.Repositories
{

	public partial class CommentRepository : ServiceLocator<ICommentRepository, CommentRepository>, ICommentRepository
 {
        protected override Func<ICommentRepository> GetFactory()
        {
            return () => new CommentRepository();
        }
        public IEnumerable<Comment> GetComments()
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<Comment>();
                return rep.Get();
            }
        }
        public IEnumerable<Comment> GetCommentsByConference(int conferenceId)
        {
            using (var context = DataContext.Instance())
            {
                return context.ExecuteQuery<Comment>(System.Data.CommandType.Text,
                    "SELECT * FROM {databaseOwner}{objectQualifier}vw_Connect_Conference_Comments WHERE ConferenceId=@0",
                    conferenceId);
            }
        }
        public IEnumerable<Comment> GetCommentsByUser(int userId)
        {
            using (var context = DataContext.Instance())
            {
                return context.ExecuteQuery<Comment>(System.Data.CommandType.Text,
                    "SELECT * FROM {databaseOwner}{objectQualifier}vw_Connect_Conference_Comments WHERE UserId=@0",
                    userId);
            }
        }
        public Comment GetComment(int commentId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<Comment>();
                return rep.GetById(commentId);
            }
        }
        public int AddComment(ref CommentBase comment)
        {
            Requires.NotNull(comment);
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
        public void DeleteComment(int commentId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<CommentBase>();
                rep.Delete("WHERE CommentId = @0", commentId);
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
    public partial interface ICommentRepository
    {
        IEnumerable<Comment> GetComments();
        IEnumerable<Comment> GetCommentsByConference(int conferenceId);
        IEnumerable<Comment> GetCommentsByUser(int userId);
        Comment GetComment(int commentId);
        int AddComment(ref CommentBase comment);
        void DeleteComment(CommentBase comment);
        void DeleteComment(int commentId);
        void UpdateComment(CommentBase comment);
    }
}


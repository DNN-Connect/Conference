using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;
using DotNetNuke.Collections;
using DotNetNuke.Common;
using DotNetNuke.Data;
using DotNetNuke.Framework;
using Connect.Conference.Core.Data;
using Connect.Conference.Core.Models.SessionTags;

namespace Connect.Conference.Core.Repositories
{

	public class SessionTagRepository : ServiceLocator<ISessionTagRepository, SessionTagRepository>, ISessionTagRepository
 {
        protected override Func<ISessionTagRepository> GetFactory()
        {
            return () => new SessionTagRepository();
        }
        public IEnumerable<SessionTag> GetSessionTagsBySession(int sessionId)
        {
            using (var context = DataContext.Instance())
            {
                return context.ExecuteQuery<SessionTag>(System.Data.CommandType.Text,
                    "SELECT * FROM {databaseOwner}{objectQualifier}vw_Connect_Conference_SessionTags WHERE SessionId=@0",
                    sessionId);
            }
        }
        public void SetSessionTag(int sessionId, int tagId)
        {
            using (var context = DataContext.Instance())
            {
                context.Execute(System.Data.CommandType.Text,
                    "IF NOT EXISTS (SELECT * FROM {databaseOwner}{objectQualifier}Connect_Conference_SessionTags " +
                    "WHERE SessionId=@0 AND TagId=@1) " +
                    "INSERT INTO {databaseOwner}{objectQualifier}Connect_Conference_SessionTags (SessionId, TagId) " +
                    "SELECT @0, @1", sessionId, tagId);
            }
        }
        public void SetSessionTags(int sessionId, List<int> sessionTags)
        {

            using (var context = DataContext.Instance())
            {
                context.Execute(System.Data.CommandType.Text,
                    "DELETE FROM {databaseOwner}{objectQualifier}Connect_Conference_SessionTags WHERE SessionId=@0", sessionId);
                context.Execute(System.Data.CommandType.Text,
                    "INSERT INTO {databaseOwner}{objectQualifier}Connect_Conference_SessionTags (SessionId, TagId) " +
                    "SELECT @0, s.RecordID " +
                    "FROM {databaseOwner}{objectQualifier}SplitDelimitedIDs(@1, ',') s", sessionId, string.Join(",", sessionTags));
            }
        }
        public void DeleteSessionTag(SessionTagBase sessionTag)
        {
            Requires.NotNull(sessionTag);
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SessionTagBase>();
                rep.Delete(sessionTag);
            }
        }
        public void DeleteSessionTagsBySession(int sessionId)
        {
            Requires.NotNull(sessionId);
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SessionTagBase>();
                rep.Delete("WHERE SessionId=@0", sessionId);
            }
        }
 }

    public interface ISessionTagRepository
    {
        IEnumerable<SessionTag> GetSessionTagsBySession(int sessionId);
        void SetSessionTag(int sessionId, int tagId);
        void SetSessionTags(int sessionId, List<int> sessionTags);
        void DeleteSessionTag(SessionTagBase sessionTag);
        void DeleteSessionTagsBySession(int sessionId);
    }
}


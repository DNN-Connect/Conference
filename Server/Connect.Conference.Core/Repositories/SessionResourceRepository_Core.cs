using System;
using System.Collections.Generic;
using System.Linq;
using DotNetNuke.Common;
using DotNetNuke.Data;
using DotNetNuke.Framework;
using Connect.Conference.Core.Models.SessionResources;

namespace Connect.Conference.Core.Repositories
{

	public partial class SessionResourceRepository : ServiceLocator<ISessionResourceRepository, SessionResourceRepository>, ISessionResourceRepository
 {
        protected override Func<ISessionResourceRepository> GetFactory()
        {
            return () => new SessionResourceRepository();
        }
        public IEnumerable<SessionResource> GetSessionResources()
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SessionResource>();
                return rep.Get();
            }
        }
        public IEnumerable<SessionResource> GetSessionResourcesBySession(int sessionId)
        {
            using (var context = DataContext.Instance())
            {
                return context.ExecuteQuery<SessionResource>(System.Data.CommandType.Text,
                    "SELECT * FROM {databaseOwner}{objectQualifier}vw_Connect_Conference_SessionResources WHERE SessionId=@0",
                    sessionId);
            }
        }
        public SessionResource GetSessionResource(int sessionResourceId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SessionResource>();
                return rep.GetById(sessionResourceId);
            }
        }
        public int AddSessionResource(ref SessionResourceBase sessionResource, int userId)
        {
            Requires.NotNull(sessionResource);
            sessionResource.CreatedByUserID = userId;
            sessionResource.CreatedOnDate = DateTime.Now;
            sessionResource.LastModifiedByUserID = userId;
            sessionResource.LastModifiedOnDate = DateTime.Now;
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SessionResourceBase>();
                rep.Insert(sessionResource);
            }
            return sessionResource.SessionResourceId;
        }
        public void DeleteSessionResource(SessionResourceBase sessionResource)
        {
            Requires.NotNull(sessionResource);
            Requires.PropertyNotNegative(sessionResource, "SessionResourceId");
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SessionResourceBase>();
                rep.Delete(sessionResource);
            }
        }
        public void DeleteSessionResource(int sessionResourceId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SessionResourceBase>();
                rep.Delete("WHERE SessionResourceId = @0", sessionResourceId);
            }
        }
        public void UpdateSessionResource(SessionResourceBase sessionResource, int userId)
        {
            Requires.NotNull(sessionResource);
            Requires.PropertyNotNegative(sessionResource, "SessionResourceId");
            sessionResource.LastModifiedByUserID = userId;
            sessionResource.LastModifiedOnDate = DateTime.Now;
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SessionResourceBase>();
                rep.Update(sessionResource);
            }
        } 
    }
    public partial interface ISessionResourceRepository
    {
        IEnumerable<SessionResource> GetSessionResources();
        IEnumerable<SessionResource> GetSessionResourcesBySession(int sessionId);
        SessionResource GetSessionResource(int sessionResourceId);
        int AddSessionResource(ref SessionResourceBase sessionResource, int userId);
        void DeleteSessionResource(SessionResourceBase sessionResource);
        void DeleteSessionResource(int sessionResourceId);
        void UpdateSessionResource(SessionResourceBase sessionResource, int userId);
    }
}


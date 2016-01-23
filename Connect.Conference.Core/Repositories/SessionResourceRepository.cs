using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;
using DotNetNuke.Collections;
using DotNetNuke.Common;
using DotNetNuke.Data;
using DotNetNuke.Framework;
using Connect.Conference.Core.Data;
using Connect.Conference.Core.Models.SessionResources;

namespace Connect.Conference.Core.Repositories
{

	public class SessionResourceRepository : ServiceLocator<ISessionResourceRepository, SessionResourceRepository>, ISessionResourceRepository
 {
        protected override Func<ISessionResourceRepository> GetFactory()
        {
            return () => new SessionResourceRepository();
        }
        public IEnumerable<SessionResource> GetSessionResources(int sessionId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SessionResource>();
                return rep.Get(sessionId);
            }
        }
        public SessionResource GetSessionResource(int sessionId, int sessionResourceId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SessionResource>();
                return rep.GetById(sessionResourceId, sessionId);
            }
        }
        public int AddSessionResource(ref SessionResourceBase sessionResource, int userId)
        {
            Requires.NotNull(sessionResource);
            Requires.PropertyNotNegative(sessionResource, "SessionId");
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
        public void DeleteSessionResource(int sessionId, int sessionResourceId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SessionResourceBase>();
                rep.Delete("WHERE SessionId = @0 AND SessionResourceId = @1", sessionId, sessionResourceId);
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

    public interface ISessionResourceRepository
    {
        IEnumerable<SessionResource> GetSessionResources(int sessionId);
        SessionResource GetSessionResource(int sessionId, int sessionResourceId);
        int AddSessionResource(ref SessionResourceBase sessionResource, int userId);
        void DeleteSessionResource(SessionResourceBase sessionResource);
        void DeleteSessionResource(int sessionId, int sessionResourceId);
        void UpdateSessionResource(SessionResourceBase sessionResource, int userId);
    }
}


using System.Collections.Generic;
using DotNetNuke.Data;
using DotNetNuke.Framework;
using Connect.Conference.Core.Models.SessionResources;

namespace Connect.Conference.Core.Repositories
{

    public partial class SessionResourceRepository : ServiceLocator<ISessionResourceRepository, SessionResourceRepository>, ISessionResourceRepository
    {
        public SessionResource GetSessionResource(int sessionId, int sessionResourceId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SessionResource>();
                return rep.GetById(sessionResourceId, sessionId);
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
    }

    public partial interface ISessionResourceRepository
    {
        SessionResource GetSessionResource(int sessionId, int sessionResourceId);
        void DeleteSessionResource(int sessionId, int sessionResourceId);
    }
}


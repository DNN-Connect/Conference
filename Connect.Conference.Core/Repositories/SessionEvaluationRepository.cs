using System;
using System.Collections.Generic;
using System.Linq;
using DotNetNuke.Common;
using DotNetNuke.Data;
using DotNetNuke.Framework;
using Connect.Conference.Core.Models.SessionEvaluations;

namespace Connect.Conference.Core.Repositories
{
	public partial class SessionEvaluationRepository : ServiceLocator<ISessionEvaluationRepository, SessionEvaluationRepository>, ISessionEvaluationRepository
    {
    }
    public partial interface ISessionEvaluationRepository
    {
    }
}


using System;
using System.Collections.Generic;
using System.Linq;
using DotNetNuke.Common;
using DotNetNuke.Data;
using DotNetNuke.Framework;
using Connect.Conference.Core.Models.ApiKeys;

namespace Connect.Conference.Core.Repositories
{
	public partial class ApiKeyRepository : ServiceLocator<IApiKeyRepository, ApiKeyRepository>, IApiKeyRepository
    {
    }
    public partial interface IApiKeyRepository
    {
    }
}


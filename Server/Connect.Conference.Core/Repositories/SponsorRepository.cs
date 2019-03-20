using System;
using System.Collections.Generic;
using System.Linq;
using DotNetNuke.Common;
using DotNetNuke.Data;
using DotNetNuke.Framework;
using Connect.Conference.Core.Models.Sponsors;

namespace Connect.Conference.Core.Repositories
{
	public partial class SponsorRepository : ServiceLocator<ISponsorRepository, SponsorRepository>, ISponsorRepository
    {
    }
    public partial interface ISponsorRepository
    {
    }
}


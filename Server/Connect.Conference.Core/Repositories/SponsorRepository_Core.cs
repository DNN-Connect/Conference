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
        protected override Func<ISponsorRepository> GetFactory()
        {
            return () => new SponsorRepository();
        }
        public IEnumerable<Sponsor> GetSponsors()
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<Sponsor>();
                return rep.Get();
            }
        }
        public IEnumerable<Sponsor> GetSponsorsByConference(int conferenceId)
        {
            using (var context = DataContext.Instance())
            {
                return context.ExecuteQuery<Sponsor>(System.Data.CommandType.Text,
                    "SELECT * FROM {databaseOwner}{objectQualifier}vw_Connect_Conference_Sponsors WHERE ConferenceId=@0",
                    conferenceId);
            }
        }
        public Sponsor GetSponsor(int sponsorId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<Sponsor>();
                return rep.GetById(sponsorId);
            }
        }
        public int AddSponsor(ref SponsorBase sponsor, int userId)
        {
            Requires.NotNull(sponsor);
            sponsor.CreatedByUserID = userId;
            sponsor.CreatedOnDate = DateTime.Now;
            sponsor.LastModifiedByUserID = userId;
            sponsor.LastModifiedOnDate = DateTime.Now;
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SponsorBase>();
                rep.Insert(sponsor);
            }
            return sponsor.SponsorId;
        }
        public void DeleteSponsor(SponsorBase sponsor)
        {
            Requires.NotNull(sponsor);
            Requires.PropertyNotNegative(sponsor, "SponsorId");
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SponsorBase>();
                rep.Delete(sponsor);
            }
        }
        public void DeleteSponsor(int sponsorId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SponsorBase>();
                rep.Delete("WHERE SponsorId = @0", sponsorId);
            }
        }
        public void UpdateSponsor(SponsorBase sponsor, int userId)
        {
            Requires.NotNull(sponsor);
            Requires.PropertyNotNegative(sponsor, "SponsorId");
            sponsor.LastModifiedByUserID = userId;
            sponsor.LastModifiedOnDate = DateTime.Now;
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<SponsorBase>();
                rep.Update(sponsor);
            }
        } 
    }
    public partial interface ISponsorRepository
    {
        IEnumerable<Sponsor> GetSponsors();
        IEnumerable<Sponsor> GetSponsorsByConference(int conferenceId);
        Sponsor GetSponsor(int sponsorId);
        int AddSponsor(ref SponsorBase sponsor, int userId);
        void DeleteSponsor(SponsorBase sponsor);
        void DeleteSponsor(int sponsorId);
        void UpdateSponsor(SponsorBase sponsor, int userId);
    }
}


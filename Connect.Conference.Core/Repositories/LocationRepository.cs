using DotNetNuke.Data;
using DotNetNuke.Framework;
using Connect.Conference.Core.Models.Locations;

namespace Connect.Conference.Core.Repositories
{

    public partial class LocationRepository : ServiceLocator<ILocationRepository, LocationRepository>, ILocationRepository
    {
        public Location GetLocation(int conferenceId, int locationId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<Location>();
                return rep.GetById(locationId, conferenceId);
            }
        }
        public void DeleteLocation(int conferenceId, int locationId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<LocationBase>();
                rep.Delete("WHERE ConferenceId = @0 AND LocationId = @1", conferenceId, locationId);
            }
        }
    }

    public partial interface ILocationRepository
    {
        Location GetLocation(int conferenceId, int locationId);
        void DeleteLocation(int conferenceId, int locationId);
    }
}


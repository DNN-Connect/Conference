using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;
using DotNetNuke.Collections;
using DotNetNuke.Common;
using DotNetNuke.Data;
using DotNetNuke.Framework;
using Connect.Conference.Core.Data;
using Connect.Conference.Core.Models.Locations;

namespace Connect.Conference.Core.Repositories
{

	public class LocationRepository : ServiceLocator<ILocationRepository, LocationRepository>, ILocationRepository
 {
        protected override Func<ILocationRepository> GetFactory()
        {
            return () => new LocationRepository();
        }
        public IEnumerable<Location> GetLocations(int conferenceId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<Location>();
                return rep.Get(conferenceId);
            }
        }
        public Location GetLocation(int conferenceId, int locationId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<Location>();
                return rep.GetById(locationId, conferenceId);
            }
        }
        public int AddLocation(LocationBase location, int userId)
        {
            Requires.NotNull(location);
            Requires.PropertyNotNegative(location, "PortalId");
            location.CreatedByUserID = userId;
            location.CreatedOnDate = DateTime.Now;
            location.LastModifiedByUserID = userId;
            location.LastModifiedOnDate = DateTime.Now;
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<LocationBase>();
                rep.Insert(location);
            }
            return location.LocationId;
        }
        public void DeleteLocation(LocationBase location)
        {
            Requires.NotNull(location);
            Requires.PropertyNotNegative(location, "LocationId");
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<LocationBase>();
                rep.Delete(location);
            }
        }
        public void UpdateLocation(LocationBase location, int userId)
        {
            Requires.NotNull(location);
            Requires.PropertyNotNegative(location, "LocationId");
            location.LastModifiedByUserID = userId;
            location.LastModifiedOnDate = DateTime.Now;
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<LocationBase>();
                rep.Update(location);
            }
        } 
 }

    public interface ILocationRepository
    {
        IEnumerable<Location> GetLocations(int conferenceId);
        Location GetLocation(int conferenceId, int locationId);
        int AddLocation(LocationBase location, int userId);
        void DeleteLocation(LocationBase location);
        void UpdateLocation(LocationBase location, int userId);
    }
}


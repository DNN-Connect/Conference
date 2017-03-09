using System;
using System.Collections.Generic;
using System.Linq;
using DotNetNuke.Common;
using DotNetNuke.Data;
using DotNetNuke.Framework;
using Connect.Conference.Core.Models.Locations;

namespace Connect.Conference.Core.Repositories
{

	public partial class LocationRepository : ServiceLocator<ILocationRepository, LocationRepository>, ILocationRepository
 {
        protected override Func<ILocationRepository> GetFactory()
        {
            return () => new LocationRepository();
        }
        public IEnumerable<Location> GetLocations()
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<Location>();
                return rep.Get();
            }
        }
        public IEnumerable<Location> GetLocationsByConference(int conferenceId)
        {
            using (var context = DataContext.Instance())
            {
                return context.ExecuteQuery<Location>(System.Data.CommandType.Text,
                    "SELECT * FROM {databaseOwner}{objectQualifier}vw_Connect_Conference_Locations WHERE ConferenceId=@0",
                    conferenceId);
            }
        }
        public Location GetLocation(int locationId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<Location>();
                return rep.GetById(locationId);
            }
        }
        public int AddLocation(ref LocationBase location, int userId)
        {
            Requires.NotNull(location);
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
        public void DeleteLocation(int locationId)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<LocationBase>();
                rep.Delete("WHERE LocationId = @0", locationId);
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
    public partial interface ILocationRepository
    {
        IEnumerable<Location> GetLocations();
        IEnumerable<Location> GetLocationsByConference(int conferenceId);
        Location GetLocation(int locationId);
        int AddLocation(ref LocationBase location, int userId);
        void DeleteLocation(LocationBase location);
        void DeleteLocation(int locationId);
        void UpdateLocation(LocationBase location, int userId);
    }
}


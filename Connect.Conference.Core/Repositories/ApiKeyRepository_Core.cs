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
        protected override Func<IApiKeyRepository> GetFactory()
        {
            return () => new ApiKeyRepository();
        }
        public IEnumerable<ApiKey> GetApiKeys()
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<ApiKey>();
                return rep.Get();
            }
        }
        public IEnumerable<ApiKey> GetApiKeysByUser(int createdByUserID)
        {
            using (var context = DataContext.Instance())
            {
                return context.ExecuteQuery<ApiKey>(System.Data.CommandType.Text,
                    "SELECT * FROM {databaseOwner}{objectQualifier}vw_Connect_Conference_ApiKeys WHERE CreatedByUserID=@0",
                    createdByUserID);
            }
        }
        public ApiKey GetApiKey(string apiKey)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<ApiKey>();
                return rep.GetById(apiKey);
            }
        }
        public void AddApiKey(ref ApiKeyBase apiKey)
        {
            Requires.NotNull(apiKey);
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<ApiKeyBase>();
                rep.Insert(apiKey);
            }
        }
        public void DeleteApiKey(ApiKeyBase apiKey)
        {
            Requires.NotNull(apiKey);
            Requires.PropertyNotNegative(apiKey, "ApiKeyId");
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<ApiKeyBase>();
                rep.Delete(apiKey);
            }
        }
        public void DeleteApiKey(string apiKey)
        {
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<ApiKeyBase>();
                rep.Delete("WHERE ApiKey = @0", apiKey);
            }
        }
        public void UpdateApiKey(ApiKeyBase apiKey)
        {
            Requires.NotNull(apiKey);
            Requires.PropertyNotNegative(apiKey, "ApiKeyId");
            using (var context = DataContext.Instance())
            {
                var rep = context.GetRepository<ApiKeyBase>();
                rep.Update(apiKey);
            }
        } 
    }
    public partial interface IApiKeyRepository
    {
        IEnumerable<ApiKey> GetApiKeys();
        IEnumerable<ApiKey> GetApiKeysByUser(int createdByUserID);
        ApiKey GetApiKey(string apiKey);
        void AddApiKey(ref ApiKeyBase apiKey);
        void DeleteApiKey(ApiKeyBase apiKey);
        void DeleteApiKey(string apiKey);
        void UpdateApiKey(ApiKeyBase apiKey);
    }
}


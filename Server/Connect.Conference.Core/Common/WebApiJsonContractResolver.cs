using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Reflection;

namespace Connect.Conference.Core.Common
{
    public class WebApiJsonContractResolver : DefaultContractResolver
    {
        public WebApiSecurityLevel Level { get; set; }
        public WebApiJsonContractResolver(WebApiSecurityLevel level)
        {
            Level = level;
        }

        protected override JsonProperty CreateProperty(MemberInfo member, MemberSerialization memberSerialization)
        {
            JsonProperty property = base.CreateProperty(member, memberSerialization);
            var securityProps = property.AttributeProvider.GetAttributes(typeof(WebApiSecurityAttribute), false);
            if (securityProps.Count == 1)
            {
                var propLevel = ((WebApiSecurityAttribute)securityProps[0]).Level;
                switch (Level)
                {
                    case WebApiSecurityLevel.Management:
                        if (propLevel == WebApiSecurityLevel.Private)
                        {
                            property.Ignored = true;
                        }
                        break;
                    case WebApiSecurityLevel.Public:
                        if (propLevel != WebApiSecurityLevel.Public)
                        {
                            property.Ignored = true;
                        }
                        break;
                    case WebApiSecurityLevel.Attendee:
                        if (propLevel == WebApiSecurityLevel.Private || propLevel == WebApiSecurityLevel.Management)
                        {
                            property.Ignored = true;
                        }
                        break;
                    default:
                        property.Ignored = true;
                        break;
                }
            }
            return property;
        }
    }

}
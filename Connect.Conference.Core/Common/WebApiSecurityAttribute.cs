using System;

namespace Connect.Conference.Core.Common
{
    [AttributeUsage(AttributeTargets.Property, Inherited = false)]
    public class WebApiSecurityAttribute : Attribute
    {
        public WebApiSecurityLevel Level { get; set; }
        public WebApiSecurityAttribute(WebApiSecurityLevel level)
        {
            Level = level;
        }
    }

    public enum WebApiSecurityLevel
    {
        Public,
        Attendee,
        Management,
        Private
    }
}

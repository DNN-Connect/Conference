
using DotNetNuke.Common.Utilities;
using DotNetNuke.Services.Localization;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using System.Text.RegularExpressions;
using System.Net;
using System;

namespace Connect.DNN.Modules.Conference.Common
{
    public static class Globals
    {

        public const string SharedResourceFileName = "~/DesktopModules/MVC/Connect/Conference/App_LocalResources/SharedResources.resx";

        public static string MinutesToString(this int minutes)
        {
            return ((int)minutes / 60).ToString() + ":" + (minutes % 60).ToString("00");
        }

        public static List<SelectListItem> StatusDropdownList(string locale)
        {
            return CBO.GetCachedObject<List<SelectListItem>>(new CacheItemArgs(string.Format("ConferenceStatusDropdownList-{0}", locale), 20, System.Web.Caching.CacheItemPriority.Default, locale), GetStatusDropdownList);
        }
        private static List<SelectListItem> GetStatusDropdownList(CacheItemArgs args)
        {
            var locale = (string)args.ParamList[0];
            var res = new List<SelectListItem>();
            foreach (var v in System.Enum.GetValues(typeof(Connect.Conference.Core.Common.SessionStatus)))
            {
                res.Add(new SelectListItem
                {
                    Text = Localization.GetString(v.ToString(), SharedResourceFileName),
                    Value = ((int)v).ToString()
                });
            }
            return res.OrderBy(i => i.Value).ToList();
        }

        public static string RemoveIllegalCharacters(this string filename)
        {
            return Regex.Replace(filename, "[\\:;,\\?]", "");
        }

        public static string ToStatusString(this Connect.Conference.Core.Common.SessionStatus status)
        {
            return Localization.GetString(status.ToString(), SharedResourceFileName);
        }

        public static string TryFormatDate(this System.DateTime? theDate, string format)
        {
            if (theDate == null) { return ""; }
            return ((System.DateTime)theDate).ToString(format);
        }

        public static IEnumerable<AutoCompletePair> ToAutoCompleteList(this IEnumerable<Connect.Conference.Core.Models.Tags.Tag> tagList)
        {
            return tagList.Select(t => new AutoCompletePair() { label = t.TagName, value = t.TagId.ToString() });
        }
        public static IEnumerable<AutoCompletePair> ToAutoCompleteList(this IEnumerable<Connect.Conference.Core.Models.Tracks.Track> trackList)
        {
            return trackList.Select(t => new AutoCompletePair() { label = t.Title, value = t.TrackId.ToString() });
        }

        public static bool IsValidUrl(this string url)
        {
            try
            {
                HttpWebRequest request = WebRequest.Create(url) as HttpWebRequest;
                request.Method = "HEAD";
                HttpWebResponse response = request.GetResponse() as HttpWebResponse;
                response.Close();
                return (response.StatusCode == HttpStatusCode.OK);
            }
            catch
            {
                return false;
            }
        }

        public static string ResolveUrl(this DotNetNuke.Entities.Portals.PortalAliasInfo portalAlias, string url)
        {
            url = url.TrimStart('~');
            url = url.TrimStart('/');
            var childPortalAlias = portalAlias.GetChildPortalAlias();
            if (childPortalAlias.StartsWith(DotNetNuke.Common.Globals.ApplicationPath))
            {
                return String.Format("{0}/{1}", childPortalAlias, url);
            }
            else
            {
                return String.Format("{0}{1}/{2}", DotNetNuke.Common.Globals.ApplicationPath, childPortalAlias, url);
            }
        }

        public static string GetChildPortalAlias(this DotNetNuke.Entities.Portals.PortalAliasInfo portalAlias)
        {
            var currentAlias = portalAlias.HTTPAlias;
            var index = currentAlias.IndexOf('/');
            if (index > 0)
            {
                return "/" + currentAlias.Substring(index + 1);
            }
            else
            {
                return "";
            }
        }

        public static List<SwitchButtonOption> SessionStatusOptions(bool isAdmin)
        {
            var res = new List<SwitchButtonOption>();
            if (isAdmin)
            {
                res.Add(new SwitchButtonOption()
                {
                    Id = -1,
                    Text = Localization.GetString("Rejected", SharedResourceFileName),
                    Confirm = Localization.GetString("Rejected.Confirm", SharedResourceFileName),
                    ClassName = "danger"
                });
            }
            res.Add(new SwitchButtonOption()
            {
                Id = 0,
                Text = Localization.GetString("NotSubmitted", SharedResourceFileName),
                Confirm = Localization.GetString("NotSubmitted.Confirm", SharedResourceFileName),
                ClassName = "default"
            });
            res.Add(new SwitchButtonOption()
            {
                Id = 1,
                Text = Localization.GetString("Submitted", SharedResourceFileName),
                Confirm = Localization.GetString("Submitted.Confirm", SharedResourceFileName),
                ClassName = "info"
            });
            res.Add(new SwitchButtonOption()
            {
                Id = 2,
                Text = Localization.GetString("Revising", SharedResourceFileName),
                Confirm = Localization.GetString("Revising.Confirm", SharedResourceFileName),
                ClassName = "warning"
            });
            if (isAdmin)
            {
                res.Add(new SwitchButtonOption()
                {
                    Id = 3,
                    Text = Localization.GetString("Accepted", SharedResourceFileName),
                    Confirm = Localization.GetString("Accepted.Confirm", SharedResourceFileName),
                    ClassName = "success"
                });
                res.Add(new SwitchButtonOption()
                {
                    Id = 4,
                    Text = Localization.GetString("Ready", SharedResourceFileName),
                    Confirm = Localization.GetString("Ready.Confirm", SharedResourceFileName),
                    ClassName = "success"
                });
                res.Add(new SwitchButtonOption()
                {
                    Id = 5,
                    Text = Localization.GetString("WrappedUp", SharedResourceFileName),
                    Confirm = Localization.GetString("WrappedUp.Confirm", SharedResourceFileName),
                    ClassName = "primary"
                });
            }
            return res;
        }

        public static string ToString(this DateTime? input, string format)
        {
            if (input == null)
            {
                return "";
            }
            return ((DateTime)input).ToString(format);
        }

    }
}
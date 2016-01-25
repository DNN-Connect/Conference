
using DotNetNuke.Common.Utilities;
using DotNetNuke.Services.Localization;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using System.Text.RegularExpressions;
using Connect.Conference.Core.Models.Comments;
using DotNetNuke.Collections;
using System.Net;

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

        public static IEnumerable<Comment> FillStampLines(this IEnumerable<Comment> commentList)
        {
            var res = new List<Comment>();
            foreach (var comment in commentList)
            {
                res.Add(comment.FillStampLine());
            }
            return res;
        }

        public static IEnumerable<Comment> FillStampLines(this IPagedList<Comment> commentList)
        {
            var res = new List<Comment>();
            foreach (var comment in commentList)
            {
                res.Add(comment.FillStampLine());
            }
            return res;
        }

        public static Comment FillStampLine(this Comment comment)
        {
            var res = comment;
            try
            {
                res.StampLine = string.Format(Localization.GetString("StampLine.Text", SharedResourceFileName), comment.Datime, comment.DisplayName);
            }
            catch { }
            return res;
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

    }
}
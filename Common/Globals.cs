
namespace Connect.DNN.Modules.Conference.Common
{
    public static class Globals
    {

        public const string SharedResourceFileName = "~/DesktopModules/Connect/Conference/App_LocalResources/SharedResources.resx";

        public static string MinutesToString(this int minutes) {
            return ((int)minutes/60).ToString() + ":" + (minutes % 60).ToString("00");
        }

    }
}
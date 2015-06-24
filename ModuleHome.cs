using System;
using DotNetNuke.Collections;
using Connect.DNN.Modules.Conference.Common;

namespace Connect.DNN.Modules.Conference
{
    public class ModuleHome : ModuleBase
    {
        public string View { get; set; }
        public string ModuleControl { get; set; }

        protected override string RazorScriptFile
        {
            get
            {
                if (ModuleControl == "")
                {
                    return string.Format("~/DesktopModules/Albatros/Balises/Views/{0}.cshtml", View);
                }
                return string.Format("~/DesktopModules/Albatros/Balises/Views/{0}/{1}.cshtml", ModuleControl, View);
            }
        }

        protected void Page_Init(object sender, EventArgs e)
        {
            View = Settings.View;
            ModuleControl = Request.QueryString.GetValueOrDefault("ctl", ModuleControl);
            View = Request.QueryString.GetValueOrDefault("View", View);
            AddService();
            LocalResourceFile = Globals.SharedResourceFileName;
        }

    }
}
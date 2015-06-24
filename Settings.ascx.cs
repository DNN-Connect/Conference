
using System;
using System.IO;
using System.Web.UI.WebControls;
using DotNetNuke.Entities.Modules;
using DotNetNuke.Services.Exceptions;

namespace Connect.DNN.Modules.Conference
{
    public partial class Settings : ModuleSettingsBase
    {
        #region Properties
        private Common.Settings.ModuleSettings _settings;
        public Common.Settings.ModuleSettings ModSettings
        {
            get { return _settings ?? (_settings = Common.Settings.ModuleSettings.GetSettings(ModuleContext.Configuration)); }
        }
        #endregion

        #region Base Method Implementations
        public override void LoadSettings()
        {
            try
            {
                if (Page.IsPostBack == false)
                {
                    ddView.Items.Clear();
                    ddView.Items.Add(new ListItem("Home", "Home"));
                    System.IO.DirectoryInfo viewDir = new DirectoryInfo(Server.MapPath("~/DesktopModules/Albatros/Balises/Views"));
                    foreach (var f in viewDir.GetFiles("*.cshtml"))
                    {
                        string vwName = Path.GetFileNameWithoutExtension(f.Name);
                        if (vwName.ToLower() != "home")
                        {
                            ddView.Items.Add(new ListItem(vwName, vwName));
                        }
                    }
                    try
                    {
                        ddView.Items.FindByValue(ModSettings.View).Selected = true;
                    }
                    catch { }
                }
            }
            catch (Exception exc) //Module failed to load
            {
                Exceptions.ProcessModuleLoadException(this, exc);
            }
        }

        public override void UpdateSettings()
        {
            try
            {
                ModSettings.View = ddView.SelectedValue;
                ModSettings.SaveSettings();
            }
            catch (Exception exc) //Module failed to load
            {
                Exceptions.ProcessModuleLoadException(this, exc);
            }
        }

        #endregion
    }
}
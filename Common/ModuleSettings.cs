using DotNetNuke.Entities.Modules;
using DotNetNuke.Entities.Modules.Settings;

namespace Connect.DNN.Modules.Conference.Common
{
    public class ModuleSettings
    {
        [ModuleSetting]
        public int Conference { get; set; } = -1;
        [ModuleSetting]
        public string View { get; set; } = "Index";
        [TabModuleSetting]
        public bool EmitBootstrap { get; set; } = true;

        public static ModuleSettings GetSettings(ModuleInfo module)
        {
            var repo = new ModuleSettingsRepository();
            return repo.GetSettings(module);
        }

        public void SaveSettings(ModuleInfo module)
        {
            var repo = new ModuleSettingsRepository();
            repo.SaveSettings(module, this);
        }
    }

    public class ModuleSettingsRepository : SettingsRepository<ModuleSettings>
    {
    }

}

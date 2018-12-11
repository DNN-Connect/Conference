import * as $ from "jquery";
import * as Models from "./Models";

declare global {
  interface Window {
    ConferenceService: any;
  }
}

export class AppManager {
  public static Modules = new Models.KeyedCollection<Models.IAppModule>();

  public static loadData(): void {
    $(".connectConference").each(function(i, el) {
      var moduleId = $(el).data("moduleid");
      AppManager.Modules.Add(
        moduleId,
        new Models.AppModule(
          moduleId,
          $(el).data("tabid"),
          $(el).data("locale"),
          $(el).data("resources"),
          $(el).data("common"),
          $(el).data("security"),
          new window.ConferenceService($, moduleId)
        )
      );
    });
  }
}

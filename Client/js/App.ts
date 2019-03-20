import * as $ from "jquery";
import { AppManager } from "./AppManager";
import { ComponentLoader } from "./ComponentLoader";

$(document).ready(function () {
  AppManager.loadData();
  ComponentLoader.load();
});

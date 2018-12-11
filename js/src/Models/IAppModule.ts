//import DataService from "../Service";
import { IContextSecurity } from "./index";

export interface IAppModule {
    moduleId: number;
    tabId: number;
    locale: string;
    resources: any;
    common: any;
    security: IContextSecurity;
    service: any;
}

export class AppModule implements IAppModule {
    public moduleId: number;
    public tabId: number;
    public locale: string;
    public resources: any;
    public common: any;
    public security: IContextSecurity;
    public service: any;
    constructor(moduleId: number, tabId: number, locale: string, resources: any, common: any, security: IContextSecurity, service: any) {
        this.moduleId = moduleId;
        this.tabId = tabId;
        this.locale = locale;
        this.resources = resources;
        this.common = common;
        this.security = security;
        this.service = service;
    }
}

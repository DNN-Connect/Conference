interface Date {
  toUTCDateTimeDigits(): string;
  addDays(days: number): Date;
}
interface DnnServiceFramework extends JQueryStatic {
    dnnSF(moduleId: number): DnnServiceFramework;
    getServiceRoot(path: string): string;
    setModuleHeaders(): void;
    getTabId(): string;
}


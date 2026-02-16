export enum Step {
  Welcome = 1,
  EngineSelection = 2,
  Relay = 3,
  Selection = 4,
  Completion = 5,
}

export type Language = "en" | "zh";

export enum BrowserType {
  Chrome = "chrome",
  Edge = "edge",
  Firefox = "firefox",
}

export interface I18nSchema {
  common: {
    next: string;
    back: string;
    start: string;
    step: string;
    skip: string;
  };
  welcome: {
    title: string;
    subtitle: string;
    description: string;
    successMessage: string;
    errorMessage: string;
  };
  engineSelection: {
    title: string;
    subtitle: string;
    googleDescription: string;
    bingDescription: string;
    duckduckgoDescription: string;
    baiduDescription: string;
    sogouDescription: string;
    bilibiliDescription: string;
    continue: string;
  };
  relay: {
    title: string;
    description: string;
    task: string;
    tip: string;
    simulatedSearch: string;
    waiting: string;
    success: string;
    proceed: string;
    placeholder: string;
    browserLabel: string;
  };
  selection: {
    title: string;
    description: string;
    task: string;
    waiting: string;
    ozSnippet: string;
    hint: string;
    success: string;
    excellent: string;
    placeholder: string;
  };
  completion: {
    title: string;
    subtitle: string;
    card1Title: string;
    card1Desc: string;
    card2Title: string;
    card2Desc: string;
    card3Title: string;
    card3Desc: string;
  };
}

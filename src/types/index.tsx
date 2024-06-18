export type HAR = chrome.devtools.network.Request & {
  apiId: string;
};

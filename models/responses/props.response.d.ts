interface PropsResponseObject {
  camelotWeb: boolean;
  preloadStickers: boolean;
  webVoipInternalTester: boolean;
  webCleanIncomingFilename: number;
  webEnableModelStorage: boolean;
  wsCanCacheRequests: boolean;
  notificationQuery: boolean;
  fbCrashlog: boolean;
  bucket: string;
  gifSearch: string;
  maxFileSize: number;
  media: number;
  maxSubject: number;
  maxParticipants: number;
  imageMaxKBytes: number;
  imageMaxEdge: number;
  statusVideoMaxDuration: number;
  frequentlyForwardedMessages: number;
  suspiciousLinks: number;
  fwdUiStartTs: number;
  restrictGroups: number;
  productCatalogOpenDeeplink: number;
  multicastLimitGlobal: number;
  finalLiveLocation: number;
  frequentlyForwardedMax: number;
  mmsMediaKeyTTL: number;
  stickers: number;
  announceGroups: number;
  groupDescLength: number;
}

type PropsResponse = [string, PropsResponseObject];
export default PropsResponse;

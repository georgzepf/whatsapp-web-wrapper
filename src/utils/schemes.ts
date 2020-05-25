import Store from './store';

export default class Schemes {
  public static readonly initResponseScheme: string[] = ['status', 'ref', 'ttl', 'update', 'curr', 'time'];
  // public static readonly rerefResponseScheme: string[] = ['status', 'ref', 'ttl'];
  public static readonly connResponseScheme: string[] = ['ref', 'wid', 'connected', 'isResponse', 'serverToken', 'browserToken', 'clientToken', 'lc', 'lg', 'locales', 'secret', 'protoVersion', 'binVersion', 'battery', 'plugged', 'platform', 'features', 'phone', 'pushname', 'tos'];
  public static readonly blocklistResponseScheme: string[] = ['id', 'blocklist'];
  public static readonly streamResponseScheme: [string, string, boolean, string] = ['Stream', 'update', false, Store.whatsappVersion.join('.')];
  public static readonly propsResponseScheme: string[] = ['camelotWeb', 'preloadStickers', 'webVoipInternalTester', 'webCleanIncomingFilename', 'webEnableModelStorage', 'wsCanCacheRequests', 'notificationQuery', 'fbCrashlog', 'bucket', 'gifSearch', 'maxFileSize', 'media', 'maxSubject', 'maxParticipants', 'imageMaxKBytes', 'imageMaxEdge', 'statusVideoMaxDuration', 'frequentlyForwardedMessages', 'suspiciousLinks', 'fwdUiStartTs', 'restrictGroups', 'productCatalogOpenDeeplink', 'multicastLimitGlobal', 'finalLiveLocation', 'frequentlyForwardedMax', 'mmsMediaKeyTTL', 'stickers', 'announceGroups', 'groupDescLength'];
}

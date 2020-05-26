import WebSocket, {ClientOptions, ErrorEvent, MessageEvent} from 'ws';
import qrcodeTerminal from 'qrcode-terminal';
import Handler from './handler';
import Store from '../utils/store';
import Helper from '../utils/helper';
import InitMessage from '../../models/messages/init.message';
// import RerefMessage from '../../models/messages/reref.message';
import AuthCredentials from '../../models/auth-credentials';

export default class Session {
  private readonly websocketAddress: string;
  private readonly websocketOptions: ClientOptions;

  constructor() {
    this.websocketAddress = 'wss://web.whatsapp.com/ws';
    this.websocketOptions = {origin: 'https://web.whatsapp.com'};
  }

  public connect(): void {
    Store.socket = new WebSocket(this.websocketAddress, this.websocketOptions);
    Store.socket.onopen = (): void => Session.requestInitialServerId();
    Store.socket.onmessage = (message: MessageEvent): void => Handler.onMessage(message);
    Store.socket.onerror = (error: ErrorEvent): void => Handler.onError(error);
    Store.socket.onclose = (): void => Handler.onDisconnect();
  }

  private static requestInitialServerId(): void {
    Store.clientId = Helper.generateClientId();
    Session.send<InitMessage>(['admin', 'init', Store.whatsappVersion, Store.whatsappDescription, Store.clientId, true]);
  }

  /* private static requestNewServerId(): void {
    Session.send<RerefMessage>(['admin', 'Conn', 'reref']);
  } */

  public static generateQrCode(): void {
    Store.privateKey = Helper.generatePrivateKey();
    Store.publicKey = Helper.generatePublicKey(Store.privateKey);
    const qrCodeString: string = `${Store.serverId},${Store.publicKey},${Store.clientId}`;
    qrcodeTerminal.generate(qrCodeString, {small: true});
  };

  public static generateEncryptionDetails(): void {
    Store.sharedSecret = Helper.generateSharedSecret(Store.privateKey, Store.secret.slice(0, 32));
    Store.sharedSecretExpanded = Helper.expandBuffer(Store.sharedSecret, 80);
    if (Session.validateSecret(Store.sharedSecretExpanded, Store.secret)) {
      Store.keysEncrypted = Buffer.concat([Store.sharedSecretExpanded.slice(64, Store.sharedSecretExpanded.length), Store.secret.slice(64, Store.secret.length)]);
      Store.keysDecrypted = Helper.aesDecrypt(Store.sharedSecretExpanded.slice(0, 32), Store.keysEncrypted.slice(0, 16), Store.keysEncrypted.slice(16, Store.keysEncrypted.length));
      const authCredentials: AuthCredentials = {
        encKey: Store.keysDecrypted.slice(0, 32),
        macKey: Store.keysDecrypted.slice(32, 64),
        clientToken: Store.clientToken,
        serverToken: Store.serverToken,
        clientId: Store.clientId
      };
      Helper.writeJsonFile('auth-credentials', authCredentials);
    }
  };

  public static validateSecret(sharedSecretExpanded: Buffer, secret: Buffer): boolean {
    const hmacSecret: Buffer = sharedSecretExpanded.slice(32, 64);
    const hmacBuffer: Buffer = Buffer.concat([secret.slice(0, 32), secret.slice(64, secret.length)]);
    return Buffer.compare(Helper.generateHmacSha256(hmacSecret, hmacBuffer), secret.slice(32, 64)) === 0;
  };
  
  public static restoreSession(): void {
    // restore session
  }

  private static send<T>(messageJson: T): void {
    const messageTag: string = new Date().getTime().toString();
    const messageData: string = JSON.stringify(messageJson);
    Store.socket.send(`${messageTag},${messageData}`);
  }
}

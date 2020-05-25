import WebSocket, {ClientOptions, MessageEvent} from 'ws';
import qrcodeTerminal from 'qrcode-terminal';
import Handler from './handler';
import Store from '../utils/store';
import Helper from '../utils/helper';
import InitMessage from '../../models/messages/init.message';
// import RerefMessage from '../../models/messages/reref.message';

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
    // generate encryption details
  };

  private static send<T>(messageJson: T): void {
    const messageTag: string = new Date().getTime().toString();
    const messageData: string = JSON.stringify(messageJson);
    Store.socket.send(`${messageTag},${messageData}`);
  }
}

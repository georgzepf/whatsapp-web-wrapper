import WebSocket from 'ws';

export default class Store {
  public static readonly whatsappVersion: number[] = [2, 2019, 8];
  public static readonly whatsappDescription: string[] = ['Custom Websocket', 'Custom Websocket'];

  public static socket: WebSocket;

  public static clientId: string;
  public static serverId: string;
  public static privateKey: string;
  public static publicKey: string;
  public static secret: Buffer;
  public static clientToken: string;
  public static serverToken: string;
  public static sharedSecret: Buffer;
  public static sharedSecretExpanded: Buffer;
  public static keysEncrypted: Buffer;
  public static keysDecrypted: Buffer;
  public static encKey: Buffer;
  public static macKey: Buffer;
}

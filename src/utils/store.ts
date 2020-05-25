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
}

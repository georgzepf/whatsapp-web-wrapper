import {MessageEvent} from 'ws';
import Schemes from '../utils/schemes';
import Store from '../utils/store';
import Session from './session';
import Helper from '../utils/helper';
import InitResponse from '../../models/responses/init.response';
// import RerefResponse from '../../models/responses/reref.response';
import ConnResponse from '../../models/responses/conn.response';
import BlocklistResponse from '../../models/responses/blocklist.response';
import StreamResponse from '../../models/responses/stream.response';
import PropsResponse from '../../models/responses/props.response';

export default class Handler {
  public static getEventType(messageJson: any[] | object): string {
    if (Array.isArray(messageJson) && messageJson[1] === Object(messageJson[1])) {
      if (Schemes.connResponseScheme.every((key: string): boolean => messageJson[1].hasOwnProperty(key))) {
        return 'conn';
      } else if (Schemes.blocklistResponseScheme.every((key: string): boolean => messageJson[1].hasOwnProperty(key))) {
        return 'blocklist';
      } else if (Schemes.propsResponseScheme.every((key: string): boolean => messageJson[1].hasOwnProperty(key))) {
        return 'props';
      }
    } else if (Array.isArray(messageJson)) {
      if (Schemes.streamResponseScheme.every((key: string | boolean): boolean => messageJson.includes(key))) {
        return 'stream';
      }
    } else {
      if (Schemes.initResponseScheme.every((key: string): boolean => messageJson.hasOwnProperty(key))) {
        return 'init';
      } /* else if (Schemes.rerefResponseScheme.every((key: string): boolean => messageJson.hasOwnProperty(key))) {
        return 'reref';
      } */
    }
    return '';
  }

  public static onMessage(messageEvent: MessageEvent): void {
    if (typeof messageEvent.data === 'string') {
      const messageData: string = messageEvent.data;
      const messageJson: any[] | object = JSON.parse(messageData.substr(messageData.indexOf(',') + 1));

      const eventType: string = Handler.getEventType(messageJson);
      switch (eventType) {
        case 'init':
          const initResponse: InitResponse = messageJson as InitResponse;
          Store.serverId = initResponse.ref;
          Session.generateQrCode();
          break;
        /* case 'reref':
          const rerefResponse: RerefResponse = messageJson as RerefResponse;
          // rerefResponse handler
          break; */
        case 'conn':
          const connResponse: ConnResponse = messageJson as ConnResponse;
          Store.secret = Helper.decodeBase64(connResponse[1].secret);
          Session.generateEncryptionDetails();
          break;
        case 'blocklist':
          const blocklistResponse: BlocklistResponse = messageJson as BlocklistResponse;
          // blocklistResponse handler
          break;
        case 'stream':
          const streamResponse: StreamResponse = messageJson as StreamResponse;
          // streamResponse handler
          break;
        case 'props':
          const propsResponse: PropsResponse = messageJson as PropsResponse;
          // propsResponse handler
          break;
      }
    }
  }
}

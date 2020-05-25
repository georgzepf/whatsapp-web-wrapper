interface ConnResponseObject {
  ref: string;
  wid: string;
  connected: boolean;
  isResponse: string;
  serverToken: string;
  browserToken: string;
  clientToken: string;
  lc: string;
  lg: string;
  locales: string;
  secret: string;
  protoVersion: number[];
  binVersion: number;
  battery: number;
  plugged: boolean;
  platform: string;
  features: object; // if needed implement more precise type / interface
  phone: object; // if needed implement more precise type / interface
  pushname: string;
  tos: number;
}

type ConnResponse = [string, ConnResponseObject];
export default ConnResponse;

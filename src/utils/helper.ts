import crypto from 'crypto';
import curve25519 from 'curve25519-n';

export default class Helper {
  public static generateClientId(): string {
    return crypto.randomBytes(16).toString('base64');
  }

  public static generatePrivateKey(): string {
    return curve25519.makeSecretKey(crypto.randomBytes(32));
  }

  public static generatePublicKey(privateKey: string): string {
    return curve25519.derivePublicKey(privateKey).toString('base64');
  }

  public static decodeBase64(data: string): Buffer {
    return new Buffer(data, 'base64');
  };
}

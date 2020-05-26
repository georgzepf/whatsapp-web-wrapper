import crypto from 'crypto';
import curve25519 from 'curve25519-n';
import futoinHkdf from 'futoin-hkdf';
import fs from 'fs';
import path from 'path';
import AuthCredentials from '../../models/auth-credentials';

export default class Helper {
  public static base64Decode(data: string): Buffer {
    return new Buffer(data, 'base64');
  };

  // crypto functions
  public static generateClientId(): string {
    return crypto.randomBytes(16).toString('base64');
  }

  public static generateHmacSha256(key: Buffer, buffer: Buffer): Buffer {
    return crypto.createHmac('sha256', key).update(buffer).digest();
  }

  public static aesDecrypt(key: Buffer, IV: Buffer, buffer: Buffer): Buffer {
    const decipher: crypto.Decipher = crypto.createDecipheriv('aes-256-cbc', key, IV);
    return Buffer.concat([decipher.update(buffer), decipher.final()]);
  };

  // curve25519-n functions
  public static generatePrivateKey(): string {
    return curve25519.makeSecretKey(crypto.randomBytes(32));
  }

  public static generatePublicKey(privateKey: string): string {
    return curve25519.derivePublicKey(privateKey).toString('base64');
  }

  public static generateSharedSecret(privateKey: string, secret: Buffer): Buffer {
    return curve25519.deriveSharedSecret(privateKey, secret);
  };

  // futoin-hkdf functions
  public static expandBuffer(buffer: Buffer, length: number): Buffer {
    return futoinHkdf(buffer, length);
  }

  // fs functions
  public static jsonFileExists(filename: string): boolean {
    return fs.existsSync(path.resolve(path.resolve(), `${filename}.json`));
  }

  public static writeJsonFile(filename: string, data: object): void {
    fs.writeFileSync(path.resolve(path.resolve(), `${filename}.json`), JSON.stringify(data));
  }

  public static readJsonFile(filename: string): AuthCredentials {
    const rawData: string = fs.readFileSync(path.resolve(path.resolve(), `${filename}.json`), 'utf8');
    return JSON.parse(rawData);
  }
}

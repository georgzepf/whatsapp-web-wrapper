interface AuthCredentials {
  encKey: Buffer;
  macKey: Buffer;
  clientToken: string;
  serverToken: string;
  clientId: string;
}

export default AuthCredentials;

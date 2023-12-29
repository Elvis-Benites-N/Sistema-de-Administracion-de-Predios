import { mode, pad } from 'crypto-js';
import { decrypt, encrypt } from 'crypto-js/aes';
import * as base64 from 'crypto-js/enc-base64';
import * as uft8 from 'crypto-js/enc-utf8';

export namespace EncryptUtil {
  export function encryptBase64(data: string, plainKey: string): string {
    try {
      const iv = uft8.parse(plainKey.substring(0, 16));
      const key = uft8.parse(plainKey.substring(16));

      return encrypt(data, key, {
        iv,
        mode: mode.CBC,
        padding: pad.Pkcs7,
      }).toString();
    } catch (error) {
      return null;
    }
  }

  export function decryptBase64(data: string, plainKey: string): string {
    try {
      const iv = uft8.parse(plainKey.substring(0, 16));
      const key = uft8.parse(plainKey.substring(16));
      const crypted = base64.parse(data);

      return decrypt(
        {
          ciphertext: crypted,
          key: null,
          algorithm: null,
          blockSize: null,
          formatter: null,
          iv: null,
          mode: null,
          padding: null,
          salt: null,
        },
        key,
        {
          iv,
          mode: mode.CBC,
          padding: pad.Pkcs7,
        }
      ).toString(uft8);
    } catch (error) {
      return null;
    }
  }

  export function oldEncryptBase64(data: string, key: string): string {
    try {
      const original = encrypt(data, key).toString();
      const utf8Encrypt = uft8.parse(original);
      return base64.stringify(utf8Encrypt);
    } catch (error) {
      return null;
    }
  }

  export function oldDecryptBase64(data: string, key: string): string {
    try {
      const base64Parsed = base64.parse(data);
      const utf8 = uft8.stringify(base64Parsed);
      return decrypt(utf8, key).toString(uft8);
    } catch (error) {
      return null;
    }
  }
}

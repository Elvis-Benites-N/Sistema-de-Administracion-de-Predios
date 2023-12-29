import { Logger } from '@nestjs/common';
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
      Logger.error('Error en encrypt', 'EncryptUtil');
      Logger.log(error);
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
      Logger.error('Error en decrypt', 'EncryptUtil');
      Logger.log(error);
      return null;
    }
  }
}

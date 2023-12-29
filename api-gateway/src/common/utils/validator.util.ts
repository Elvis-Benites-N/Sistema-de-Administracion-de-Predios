import { Logger } from '@nestjs/common';

export namespace ValidadorUtil {
  export function getSafeIP(ip: string) {
    try {
      if (!ip || ip.trim().length === 0) return '::1';

      if (ip.trim().length <= 45) return ip;

      return ip.substring(0, 45);
    } catch (error) {
      Logger.error('Error al obtener IP', 'ValidadorUtil');
      return 'Ip Desconocida';
    }
  }
}

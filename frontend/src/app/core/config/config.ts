import { InjectionToken } from '@angular/core';

export type Config = {
  readonly services: {
    readonly backend: {
      readonly url: string;
    };
  };
  readonly sso: {
    readonly frontendURL: string;
    readonly sistemaPublicKey: string;
  };
  readonly banner: {
    readonly mostrar: string;
    readonly nombre: string;
    readonly background: string;
    readonly icon: string;
  };
};

export const APP_CONFIG: InjectionToken<Config> = new InjectionToken<Config>(
  'Application Config'
);

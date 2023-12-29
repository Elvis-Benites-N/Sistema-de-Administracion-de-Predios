// CAMBIAR LAS 4 LLAVES
const COOKIE_ACCESS_KEY_DEV =
  'KW0RW5cJlfeBxsibvyA5SduAHvOAnAwucTjQwEfWNcTDhprQ';
const COOKIE_ACCESS_KEY_PROD =
  'o3UpyYDzbFNbLSa9ykEqmfohKwQDZOg1sfp6IQCYKvpar596';
const COOKIE_REFRESH_KEY_DEV =
  '6ldUUckSovCFlpqwlcceYUqccMAqo2GWLRqSBtbjHWESD6sD';
const COOKIE_REFRESH_KEY_PROD =
  'fHG6Eu4nw4dB1bLWSVm1lcTxUOGXAdmBNRWWF3WWhgxRuXvb';

export function getCookieAccessKey(): string {
  return process.env.MODE_ENV === 'prod'
    ? COOKIE_ACCESS_KEY_PROD
    : COOKIE_ACCESS_KEY_DEV;
}

export function getCookieRefreshKey(): string {
  return process.env.MODE_ENV === 'prod'
    ? COOKIE_REFRESH_KEY_PROD
    : COOKIE_REFRESH_KEY_DEV;
}

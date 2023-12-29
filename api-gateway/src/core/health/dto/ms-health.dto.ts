export interface MSHealth {
  readonly name?: string;
  readonly statusCode: 200 | 500;
  readonly statusName: 'OK' | 'Error';
  readonly detail?: any;
  readonly version: string;
}

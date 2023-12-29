import { Route } from '@angular/router';

export interface Breadcrumb {
  readonly label?: string;
  readonly routerlink?: string;
  readonly icon?: string;
}

export interface DataRoute {
  readonly webtitle?: string;
  readonly webdescription?: string;
  readonly title?: string;
  readonly description?: string;
  readonly breadcrumb?: Breadcrumb;
  readonly funcionalidades?: number[];
  readonly extras?: any;
}

export interface CustomRoute extends Route {
  data?: DataRoute;
  children?: CustomRoute[];
}

export declare type CustomRoutes = CustomRoute[];

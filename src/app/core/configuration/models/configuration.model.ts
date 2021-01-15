
/**
 * Model para configuração da aplicação
 */
export class IConfiguration {
  baseUrl?: string;
  /** @ignore */
  api?: string;
  /** @ignore */
  production?: boolean;
  /** @ignore */
  publicKey?: string;
  /** @ignore */
  routerLogin?: string;
  /** @ignore */
  routerDashboard?: string;
  /** @ignore */
  enablePreRender?: boolean;
  /** @ignore */
  enableServerSideRender?: boolean;
  /** @ignore */
  plugins?: Array<any>;
}

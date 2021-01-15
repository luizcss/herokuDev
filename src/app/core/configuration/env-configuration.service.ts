import { Injectable, Inject } from '@angular/core';

import { IConfiguration } from './models/configuration.model';
import { APP_SETTINGS } from './configuration.token';

@Injectable({
  providedIn: 'root',
})
export class EnvConfigurationService {
  /** @ignore */
  public settings: IConfiguration;

  /** @ignore */
  constructor(@Inject(APP_SETTINGS) private config: IConfiguration) {
    this.settings = { ...this.config };
  }
}

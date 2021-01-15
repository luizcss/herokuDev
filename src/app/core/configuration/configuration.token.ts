import { InjectionToken } from '@angular/core';

export const APP_SETTINGS = new InjectionToken<{ [key: string]: string }>(
  'APP_SETTINGS'
);

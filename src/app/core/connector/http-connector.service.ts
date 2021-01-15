import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { EnvConfigurationService } from '../configuration/env-configuration.service';

import { IRequest } from './models/request.model';

import { IConfiguration } from '../configuration/models/configuration.model';

import { IRequestOptions } from './models/request-options.model';


@Injectable({
  providedIn: 'root',
})
export class HttpConnectorService {
  /** @ignore */
  // private defaultHeaders: HttpHeaders;
  /** @ignore */
  private settings: IConfiguration;

  /**
   * Constructor
   */
  constructor(
    private http: HttpClient,
    private configService: EnvConfigurationService,
  ) {
    this.settings = this.configService.settings;
  }

  /**
   * Acn Connector Request
   *
   * @return an `Observable`
   */
  request(
    name: string,
    options?: {
      body?: any;
      params?:
        | HttpParams
        | {
            [param: string]: string | string[];
          };
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };
    },
  ): Observable<any> {
    const operation = Object.assign(
      {
        method: 'GET',
      },
      //this.settings.apiConfigs[name],
    );
    const url = `${this.settings.api}${operation.path}`;
    const observe = (operation.observe !== undefined ? operation.observe : 'body') as 'body';
    const responseType = (operation.responseType !== undefined
      ? operation.responseType
      : 'json') as 'json';
    const requestOptions = Object.assign({}, options, {
      observe,
      reportProgress: operation.reportProgress !== undefined ? operation.reportProgress : false,
      responseType,
      withCredentials: operation.withCredentials !== undefined ? operation.withCredentials : true,
    });

    return this.http.request<Observable<any>>(operation.method, url, requestOptions);
  }

  post<T>(request: IRequest): Observable<T> {
    this._removeNullParams(request.body);

    return this.http
      .post<T>(`${this.settings.api}/${request.endPoint}`, request.body, this._setOptions(request));
  }

  get<T>(request: IRequest): Observable<T> {

    return this.http
      .get<T>(`${this.settings.api}/${request.endPoint}`, this._setOptions(request));
  }

  put<T>(request: IRequest): Observable<T> {
    this._removeNullParams(request.body);

    return this.http
      .put<T>(`${this.settings.api}/${request.endPoint}`, request.body, this._setOptions(request));
  }

  delete<T>(request: IRequest): Observable<T> {

    return this.http
      .delete<T>(`${this.settings}/${request.endPoint}`, this._setOptions(request));
  }

  private _setOptions(request: IRequest) {
    const options: IRequestOptions = {};

    if (request.hasOwnProperty('fullResponse')) {
      options.observe = 'response';
    }

    if (request.hasOwnProperty('queryString')) {
      this._removeNullParams(request.queryString);
      options.params = {
        ...request.queryString,
      };
    }

    return options;
  }

  private _removeNullParams(obj: any) {
    for (const prop in obj) {
      if (obj[prop] && obj[prop].length <= 0) {
        delete obj[prop];
      }
    }
  }
}

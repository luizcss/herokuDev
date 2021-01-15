import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

interface LoginResponse {
  username: string;
  access_token: string;
  token_type: string;
  expires_in: number;
}

let headers = new HttpHeaders()
.append('Content-Type', 'application/x-www-form-urlencoded')
.append('Authorization', environment.basicAccessCode);

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtPayload: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
  ) {
    this.carregarToken();
  }

  login(usuario: string, senha: string): Promise<void> {

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post<LoginResponse>(environment.oauthTokenUrl, body, {
      headers,
      observe: 'response', withCredentials: true
    })
      .toPromise()
      .then(response => {
        let token = response.body?.access_token || '';
        this.armazenarToken(token);
      })

  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');

    return !token || this.jwtHelper.isTokenExpired(token);
  }

  async obterNovoAccessToken(): Promise<void> {

    const body = 'grant_type=refresh_token';

    try {
      const response = await this.http.post<LoginResponse>(environment.oauthTokenUrl, body,
        { headers, withCredentials: true })
        .toPromise();
      this.armazenarToken(response.access_token);

      return await Promise.resolve();
    } catch (response_1) {
      return await Promise.resolve();
    }
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUsuario() {
    return this.jwtPayload.user_name;
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  temQualquerPermissao(roles: any) {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }

    return false;
  }

  limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }
}

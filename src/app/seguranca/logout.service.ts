import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class LogoutService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  logout() {
    const headers = new HttpHeaders()
      .append('Authorization', `Bearer ${this.auth.getToken()}`);
    return this.http.delete(environment.tokensRenokeUrl, { headers, withCredentials: true })
      .toPromise()
      .then(() => {
        this.auth.limparAccessToken();
      });
  }

}

import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  apiUrl: string = isPlatformBrowser(this.platformId)
    ? '/api'
    : 'http://localhost:4200/api';

  constructor(private httpClient: HttpClient, @Inject(PLATFORM_ID) private platformId: any, private cookieService: CookieService) { }

  private addHeaders(options: any) {
    let token = undefined;
    if (isPlatformServer(this.platformId)) {
      token = this.cookieService.get('jwt');
    } else if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('jwt');
    }
    if (options && options.headers) {
      options.headers['Authorization'] = `Bearer ${token}`;
    } else {
      options = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    }
    return options;
  }

  get<Type>(url: string, options?: { headers?: any }): Promise<Type> {
    options = this.addHeaders(options);
    return this.httpClient
      .get<Type>(`${this.apiUrl}/${url}`, options)
      .toPromise();
  }

  post<Type>(url: string, body: any, options?: { headers?: any }): Promise<Type> {
    options = this.addHeaders(options);
    return this.httpClient
      .post<Type>(`${this.apiUrl}/${url}`, body, options)
      .toPromise();
  }

  patch<Type>(url: string, body: any, options?: { headers?: any }): Promise<Type> {
    options = this.addHeaders(options);
    return this.httpClient
      .patch<Type>(`${this.apiUrl}/${url}`, body, options)
      .toPromise();
  }

  put<Type>(url: string, body: any, options?: { headers?: any }): Promise<Type> {
    options = this.addHeaders(options);
    return this.httpClient
      .put<Type>(`${this.apiUrl}/${url}`, body, options)
      .toPromise();
  }

  delete<Type>(url: string, options?: { headers?: any }): Promise<Type> {
    options = this.addHeaders(options);
    return this.httpClient
      .delete<Type>(`${this.apiUrl}/${url}`, options)
      .toPromise();
  }


}

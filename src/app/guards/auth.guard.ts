import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service'
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(@Inject(PLATFORM_ID) private platformId: any, private cookieService: CookieService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (isPlatformServer(this.platformId) && !!this.cookieService.get('jwt')) {
      return true
    } else if (isPlatformBrowser(this.platformId) && !!localStorage.getItem('jwt')) {
      return true
    } else {
      return this.router.parseUrl('/');
    }
  }

}

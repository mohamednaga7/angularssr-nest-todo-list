import { Injectable } from '@angular/core';
import { CreateUserDto } from 'server/auth/dto/create-user.dto';
import { User } from 'src/app/models/user.model';
import { NetworkService } from '../network-service.service';
import { CookieService } from 'ngx-cookie-service';
import { RequestSignInDto } from 'server/auth/dto/request-sign-in.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private netWorkService: NetworkService, private cookieService: CookieService) { }

  signup(userSignUpDTO: CreateUserDto) {
    this.netWorkService.post<{ user: User, jwt: string }>('signup', userSignUpDTO)
      .then(({ user, jwt }: { user: User, jwt: string }) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('jwt', jwt);
        this.cookieService.set('jwt', jwt);
        return user;
      })
      .catch(err => {
        console.log(err);
      })
  }

  signin(userSignInDTO: RequestSignInDto) {
    this.netWorkService.post<{ user: User, jwt: string }>('signin', userSignInDTO)
      .then(({ user, jwt }: { user: User, jwt: string }) => {
        console.log(user, jwt)
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('jwt', jwt);
        this.cookieService.set('jwt', jwt);
        return user;
      })
      .catch(err => {
        console.log(err);
      })
  }

  logout() {
    localStorage.clear();
    this.cookieService.deleteAll();
  }
}

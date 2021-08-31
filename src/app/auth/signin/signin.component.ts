import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  usernameOrEmail: string = '';
  password: string = ''
  callInProgress: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (this.callInProgress) return;
    if (this.usernameOrEmail.trim() == "") {
      alert('please enter a username or email')
      return;
    }
    if (this.password.trim() == "") {
      alert('please enter a password')
      return;
    }
    this.callInProgress = true
    this.authService.signin(
      { usernameOrPassword: this.usernameOrEmail, password: this.password }
    );
  }

}

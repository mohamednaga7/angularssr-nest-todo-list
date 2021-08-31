import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  username: string = '';
  firstName: string = '';
  lastName: string = '';
  phoneNumber: string = '';
  email: string = '';
  password: string = ''
  confirmPassword: string = '';
  callInProgress: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (this.callInProgress) return;
    if (this.firstName.trim() == "") {
      alert('please enter your first name')
      return;
    }
    if (this.lastName.trim() == "") {
      alert('please enter your last name')
      return;
    }
    if (this.email.trim() == "") {
      alert('please enter an email')
      return;
    }
    if (this.username.trim() == "") {
      alert('please enter a username')
      return;
    }
    if (this.password.trim() == "") {
      alert('please enter a password')
      return;
    }
    if (this.password !== this.confirmPassword) {
      alert('The password confirmation and the password didnt match please type it again')
      return;
    }
    this.callInProgress = true
    this.authService.signup(form.form.value);
  }

}

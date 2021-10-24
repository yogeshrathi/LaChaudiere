import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm = new FormGroup({
    clientId: new FormControl(undefined, [Validators.required]),
    clientPassword: new FormControl(undefined, [Validators.required]),
  });

  generatePasswordForm = new FormGroup({
    clientId: new FormControl(undefined, [Validators.required]),
  });

  isLoginSubmitted = false;
  isSubmitted = false;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  generatePassword = () => {}
  
  forgetPassword = () => {
    this.isSubmitted = true;
    if(this.generatePasswordForm.valid){
      this.userService.forgetPassword({
        clientId: this.generatePasswordForm.value.clientId,
      }).subscribe(res => {
        console.log(res);
      })
    }
  }

  login = () => {
    this.isLoginSubmitted = true;
    if(this.loginForm.valid){
      this.userService.login({
        clientId: this.loginForm.value.clientId,
        password: this.loginForm.value.clientPassword
      }).subscribe(res => {
        console.log(res);
      })
    }
  }
}

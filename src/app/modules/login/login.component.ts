import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {
  }

  generatePassword = () => {}
  
  forgetPassword = () => {}

  login = () => {}
}

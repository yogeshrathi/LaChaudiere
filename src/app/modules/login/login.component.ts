import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GeneralService } from 'src/app/core/services/general.service';
import { UserService } from 'src/app/core/services/user.service';
import { SubscriptionDisposer } from 'src/app/shared/helpers/subscription-disposer';
import { App } from '@capacitor/app';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends SubscriptionDisposer implements OnInit, OnDestroy {


  //Variables
  loginForm = new FormGroup({
    clientId: new FormControl("", [Validators.required]),
    clientPassword: new FormControl("", [Validators.required]),
  });

  generatePasswordForm = new FormGroup({
    clientId: new FormControl("", [Validators.required]),
  });

  isLoginSubmitted = false;
  isSubmitted = false;
  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private generalService: GeneralService
  ) {
    super();
  }

  //Functions
  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      let r = localStorage.getItem('r');
      if (r == 'true') {
        this.router.navigate(['/admin'])
      } else {
        this.router.navigate(['/home'])
      }
    }
    this.generalService.hideLinks = true;
  }

  generatePassword = () => { }

  forgetPassword = () => {
    this.isSubmitted = true;
    if (this.generatePasswordForm.valid) {
      this.userService.forgetPassword({
        clientId: this.generatePasswordForm.value.clientId,
      }).subscribe(res => {
        this.toastr.success('Email Sent.');
      })
    }
  }

  login = () => {
    this.isLoginSubmitted = true;
    if (this.loginForm.valid) {
      this.userService.login({
        clientId: this.loginForm.value.clientId,
        password: this.loginForm.value.clientPassword
      }).subscribe(res => {
        // console.log(res);
        this.toastr.success('Login successfully');
        localStorage.setItem('token', res.accessToken);
        localStorage.setItem('userId', this.loginForm.value.clientId);
        this.generalService.isUserChange.next(true);
        if (res.role === 'admin') {
          localStorage.setItem('r', 'true');
          setTimeout(() => {
            this.router.navigate(['/admin'])
          }, 100);
        } else {
          this.userService.getAvlDays().subscribe(res => {
            localStorage.setItem('a', JSON.stringify(res.avlDays));
          })
          setTimeout(() => {
            this.router.navigate(['/home'])
          }, 100);
        }

      }, (err) => {
        if(err.status == 401){
        this.toastr.error('Please enter valid credentials');}
        else{
          this.toastr.error(err.error.message);
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.generalService.hideLinks = false;
  }
}

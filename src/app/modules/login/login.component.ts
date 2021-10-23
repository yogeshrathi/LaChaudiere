import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services/api.service';
import { GeneralService } from 'src/app/core/services/general.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { SubscriptionDisposer } from 'src/app/shared/helpers/subscription-disposer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends SubscriptionDisposer implements OnInit {


  //Variables
  loginForm = new FormGroup({
    clientId: new FormControl("", [Validators.required]),
    clientPassword: new FormControl("", [Validators.required]),
  });

  generatePasswordForm = new FormGroup({
    clientId: new FormControl("", [Validators.required]),
  });

  constructor(private generalService: GeneralService,
    private apiService: ApiService,
    private storageService: StorageService) {
    super();
  }

  //Functions
  ngOnInit(): void {
  }

  login = () => {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    else {
      const payload = {
        clientId: this.loginForm.value.clientId,
        clientPassword: this.loginForm.value.clientPassword
      }
      this.apiService.login(payload)
        .pipe(takeUntil(this.destroyed$))
        .subscribe((res: any) => {
          if (!res) {
            if (res.status == 400) {
              this.generalService.displayError(res.message);
              return;
            }
            else {
              this.storageService.setCookie("token",this.loginForm.value.clientId);
              this.generalService.displaySuccess(res.message);
              this.resetLoginForm();
            }
          }
        },
          (error) => {
            console.log(error);
          })
    }
  }

  generatePassword = () => {
    if (this.generatePasswordForm.invalid) {
      this.generatePasswordForm.markAllAsTouched();
      return;
    }
    else {
      const payload = {
        clientId: this.generatePasswordForm.value.clientId
      }
      console.log("paylaod", payload);
      this.apiService.generatePwd(payload)
        .pipe(takeUntil(this.destroyed$))
        .subscribe((res: any) => {
          if (res) {
            if (res.status == 400) {
              this.generalService.displayError(res.message);
              return;
            }
            else {
              this.generalService.displaySuccess(res.message);
              this.resetGeneratePwd();
            }
          }
        },
          (error) => {
            console.log(error);
          })
    }
  }

  get f() {
    return this.loginForm.controls;
  }
  get g() {
    return this.generatePasswordForm.controls;
  }

  resetLoginForm(): void {
    this.loginForm.reset();
  }

  resetGeneratePwd(): void {
    this.generatePasswordForm.reset();
  }

}

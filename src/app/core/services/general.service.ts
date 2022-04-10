import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private toastrService: ToastrService) { }
  public hideLinks = false;
  public isUserChange = new BehaviorSubject<boolean>(false);
  public selectedLanguage = 'en';

  public displayError(title: string, message: string = ''): void {
    this.toastrService.error(message, title);
  }

  public displaySuccess(title: string, message: string = '') {
    this.toastrService.success(message, title);
  }

  public displayInfo(title: string, message: string = ''): void {
    this.toastrService.info(message, title);
  }

  public displayWarning(title: string, message: string = ''): void {
    this.toastrService.warning(message, title);
  }
}

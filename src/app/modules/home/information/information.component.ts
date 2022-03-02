import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user.service';
@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    alert('Back button pressed')
  }
  
  user: any;
  userForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
    confirmPassword: new FormControl("", [Validators.required]),
    city: new FormControl("", [Validators.required]),
    companyName: new FormControl("", [Validators.required]),
    phone: new FormControl("", [Validators.required]),
    postalCode: new FormControl("", [Validators.required]),
  });
  isSubmitted = false;

  constructor(private userService: UserService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData = () => {
    this.userService.getUserInfo().subscribe(res => {
      this.user = res;
      this.userForm.patchValue({
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
        confirmPassword: this.user.password,
        city: this.user.city,
        companyName: this.user.companyName,
        phone: this.user.phone,
        postalCode: this.user.postalCode
      })
    })
  }

  updateUser = () => {
    this.isSubmitted = true;
    if (this.userForm.valid && (this.userForm.value.password == this.userForm.value.confirmPassword)) {
      this.userService.updateUserInfo({
        name: this.userForm.value.name,
        email: this.userForm.value.email,
        password: this.userForm.value.password,
        confirmPassword: this.userForm.value.password,
        city: this.userForm.value.city,
        companyName: this.userForm.value.companyName,
        phone: this.userForm.value.phone,
        postalCode: this.userForm.value.postalCode,
        address: this.user.address
      }).subscribe(res => {
        this.toastr.success('Info updated Successfully.')
        this.getUserData();
      })
    }
  }

}

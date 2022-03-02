import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { GeneralService } from 'src/app/core/services/general.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  modalRef?: BsModalRef;
  users: Array<any> = [];
  search: string = '';

  userForm = new FormGroup({
    clientId: new FormControl('', Validators.required),
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl("", [Validators.required, Validators.minLength(8)]),
    phone: new FormControl("", [Validators.required, Validators.minLength(8)]),
    address: new FormControl("", [Validators.required]),
    postalCode: new FormControl("", [Validators.required]),
    city: new FormControl("", [Validators.required]),
    companyName: new FormControl("", [Validators.required]),
    role: new FormControl("client", [Validators.required]),
    location: new FormControl("", [Validators.required]),
    isActive: new FormControl(true, [Validators.required]),
    monday: new FormControl(false, [Validators.required]),
    tuesday: new FormControl(false, [Validators.required]),
    wednesday: new FormControl(false, [Validators.required]),
    thursday: new FormControl(false, [Validators.required]),
    friday: new FormControl(false, [Validators.required]),
    saturday: new FormControl(false, [Validators.required]),
    sunday: new FormControl(false, [Validators.required]),
    _id: new FormControl(""),
  });

  isSubmitted = false;
  selectedUser: any;


  constructor(private userService: UserService, private modalService: BsModalService,
    private generalApi: GeneralService) { }


  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(): void {
    this.userService.getCustomers().subscribe(res => {
      if (res) {
        this.users = res?.data;
      }
    })
  }


  openModal(template: TemplateRef<any>, isEdit: boolean, user?: any) {
    if(isEdit){
      this.userForm.patchValue(user);
      this.userForm.patchValue({
        password: ''
      })
    } else{
      this.userForm.reset();
    }
    setTimeout(() => {
      this.modalRef = this.modalService.show(template);
    }, 10);
  }

  updateUser() {
    this.isSubmitted = true;
    if (this.userForm.valid && (this.userForm.value.password == this.userForm.value.confirmPassword)) {
      if (this.userForm.value._id) {
        this.userService.updateUser(this.userForm.value).subscribe(res => {
          if (res) {
            this.isSubmitted = false;
            this.getCustomers();
            this.modalRef?.hide();
          }
        }, err => {
          this.isSubmitted = false;
          this.generalApi.displayError("Error", err.error.message);
        })
      } else {
        this.userService.addUser(this.userForm.value).subscribe((res: any) => {
          if (res) {
            this.isSubmitted = false;
            this.generalApi.displaySuccess("Success", "User added successfully");
            this.getCustomers();
            this.modalRef?.hide();
          }
        }, err => {
          this.isSubmitted = false;
          this.generalApi.displayError("Error", err.error.message);
        })
      }
    }
  }

}

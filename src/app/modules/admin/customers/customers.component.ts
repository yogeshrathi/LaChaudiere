import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { GeneralService } from 'src/app/core/services/general.service';
import { UserService } from 'src/app/core/services/user.service';
import * as XLSX from 'xlsx';
type AOA = any[][];

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  modalRef?: BsModalRef;
  users: Array<any> = [];
  search: string = '';

  data: AOA = [[1, 2], [3, 4]];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';

  @ViewChild('fileUpload', { static: false }) fileUpload!: ElementRef;

  userForm = new FormGroup({
    clientId: new FormControl('', Validators.required),
    name: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
    postalCode: new FormControl(''),
    city: new FormControl(''),
    companyName: new FormControl('', [Validators.required]),
    role: new FormControl("client"),
    location: new FormControl(''),
    isActive: new FormControl(true),
    monday: new FormControl(false),
    tuesday: new FormControl(false),
    wednesday: new FormControl(false),
    thursday: new FormControl(false),
    friday: new FormControl(false),
    saturday: new FormControl(false),
    sunday: new FormControl(false),
    _id: new FormControl(""),
  });

  isSubmitted = false;
  selectedUser: any;
  currentUser = '';

  constructor(private userService: UserService, private modalService: BsModalService,
    private generalApi: GeneralService) { }


  ngOnInit(): void {
    this.currentUser = localStorage.getItem('userId') || '';
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
    this.selectedUser = user;
    if (isEdit) {
      this.userForm.reset();
      this.userForm.patchValue(user);
      this.userForm.patchValue({
        confirmPassword: user.password
      })
    } else {
      this.userForm.reset();
      this.userForm.patchValue({
        role: 'client'
      })
    }
    setTimeout(() => {
      this.modalRef = this.modalService.show(template);
    }, 10);
  }

  updateUser(): void {
    this.isSubmitted = true;
    if(this.userForm.value.password && (this.userForm.value.password != this.userForm.value.confirmPassword)){
      return;
    }
    // if(this.userForm.value.password && (this.userForm.value.password == this.userForm.value.confirmPassword)){
    //   return false;
    // }
    if (this.userForm.valid) {
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

  deleteUser(clientId: any) {
    this.userService.deleteCustomer({ clientId: clientId }).subscribe(res => {
      if (res) {
        this.generalApi.displaySuccess("Success", "User deleted successfully");
        this.getCustomers();
      }
    }, err => {
      this.generalApi.displayError("Error", err.error.message);
    })
  }

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));


      this.data.forEach((data) => {
        if (!isNaN(data[0])) {
          this.userService.addUser({
            clientId: `${data[0]}`,
            name: data[1],
            email: data[2],
            phone: data[3],
            isActive: data[4] == 'Inactive' ? false : true,
            address: data[5],
            city: data[6],
            postalCode: data[7],
            companyName: data[8],
            location: data[9],
            monday: data[10] == 'x' ? true : false,
            tuesday: data[11] == 'x' ? true : false,
            wednesday: data[12] == 'x' ? true : false,
            thursday: data[13] == 'x' ? true : false,
            friday: data[14] == 'x' ? true : false,
            saturday: data[15] == 'x' ? true : false,
            sunday: false,
          }).subscribe((res: any) => {
            console.log("res:", res);
          }, err => {
            this.generalApi.displayError("Error", err.error.message);
          });
        }
      })

    };
    reader.readAsBinaryString(target.files[0]);
  }

  handleImport() {
    this.fileUpload.nativeElement.click();
  }
}

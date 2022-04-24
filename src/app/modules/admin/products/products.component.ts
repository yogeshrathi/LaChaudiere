import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Lightbox } from 'ngx-lightbox';
import { GeneralService } from 'src/app/core/services/general.service';
import { UserService } from 'src/app/core/services/user.service';
import * as XLSX from 'xlsx';
type AOA = any[][];

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  modalRef?: BsModalRef;
  products: Array<any> = [];
  search: string = '';
  isSubmitted = false;
  productForm = new FormGroup({
    product_name: new FormControl("", [Validators.required]),
    imageUrl: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    isAvailable: new FormControl(true),
    product_number: new FormControl("", [Validators.required]),
    _id: new FormControl(""),
    image: new FormControl("")
  });

  data: AOA = [[1, 2], [3, 4]];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';

  @ViewChild('fileUpload', { static: false }) fileUpload!: ElementRef;


  constructor(private userService: UserService, private lightbox: Lightbox,
    private modalService: BsModalService, private generalApi: GeneralService) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.userService.getProducts().subscribe(res => {
      if (res) {
        this.products = res?.data;
      }
    })
  }

  onImageClick(product: any): void {
    const src = product.imageUrl
    const caption = product.product_name;
    const album = {
      src: src,
      caption: caption,
      thumb: src
    };

    this.lightbox.open([album], 0);
  }


  openModal(template: TemplateRef<any>, isEdit: boolean, product?: any) {
    if (isEdit) {
      this.productForm.patchValue(product);
    } else {
      this.productForm.reset();
    }
    setTimeout(() => {
      this.modalRef = this.modalService.show(template);
    }, 10);
  }

  onChangeLink(event: any) {
    const control = this.productForm.get('image');
    control?.setValue(event.target.files[0]);
  }

  updateProduct() {
    this.isSubmitted = true
    if (this.productForm.valid) {
      if (this.productForm.value._id) {
        this.userService.updateProduct(this.productForm.value).subscribe((res) => {
          if (res) {
            this.isSubmitted = false;
            this.getProducts();
            this.modalRef?.hide();
          }
        }, err => {
          this.isSubmitted = false;
          this.generalApi.displayError("Error", err.error.message);
        })
      } else {
        this.userService.addProduct(this.productForm.value).subscribe((res: any) => {
          if (res) {
            this.isSubmitted = false;
            this.generalApi.displaySuccess("Success", "Product added successfully");
            this.getProducts();
            this.modalRef?.hide();
          }
        }, err => {
          this.isSubmitted = false;
          this.generalApi.displayError("Error", err.error.message);
        })
      }
    }
  }

  deleteItem(id: string) {
    this.userService.deleteProduct({ _id: id }).subscribe((res: any) => {
      if (res) {
        this.getProducts();
        this.generalApi.displaySuccess("Success", "Product deleted successfully");
      }
    }, err => {
      this.generalApi.displayError("Error", err.error.message);
    })
  }

  upload() {
    if (this.productForm.value.image) {
      this.userService.getSignature().subscribe(res => {
        const formData = new FormData()
        formData.append("file", this.productForm.value.image);
        formData.append("api_key", '422457934437796');
        formData.append("signature", res.signature);
        formData.append("timestamp", res.timestamp);
        formData.append("eager", "c_pad,h_300,w_400|c_crop,h_200,w_260");
        formData.append("folder", "signed_upload_demo_form");
        this.userService.uploadFile(formData).subscribe(result => {
          this.productForm.patchValue({
            imageUrl: result.url,
          })
          setTimeout(() => {
            this.updateProduct()
          }, 0);
        })
      });
    } else{
      this.updateProduct()
    }
  }

  handleImport(){
    this.fileUpload.nativeElement.click();
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

      console.log(this.data);
      this.data.forEach((data) => {
        if (!isNaN(data[0])) {
          this.userService.addProduct({
            product_number: data[0],
            product_name: data[1],
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

}

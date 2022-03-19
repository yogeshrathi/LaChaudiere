import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Lightbox } from 'ngx-lightbox';
import { GeneralService } from 'src/app/core/services/general.service';
import { UserService } from 'src/app/core/services/user.service';

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
    _id: new FormControl(""),
  });
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
    if(isEdit){
      this.productForm.patchValue(product);
    } else{
      this.productForm.reset();
    }
    setTimeout(() => {
      this.modalRef = this.modalService.show(template);
    }, 10);
  }

  updateProduct(){
      this.isSubmitted = true
    if(this.productForm.valid){
      if(this.productForm.value._id){
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

  deleteItem(id: string){
    this.userService.deleteProduct({_id: id}).subscribe((res: any) => {
      if (res) {
        this.getProducts();
        this.generalApi.displaySuccess("Success", "Product deleted successfully");
      }
    }, err => {
      this.generalApi.displayError("Error", err.error.message);
    })
  }
}

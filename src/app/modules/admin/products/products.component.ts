import { Component, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Array<any> = [];
  search: string = '';
  constructor(private userService: UserService, private lightbox: Lightbox,) { 
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

  editItem(product: any): void {
    
  }

}

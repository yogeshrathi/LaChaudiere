import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Array<any> = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.products.forEach((item: any) => {
      item.quantity = 0;
    })
    this.userService.getPoducts().subscribe(res => {
      if (res) {
        this.products = res?.data;
        console.log("products", this.products);
      }
    })
  }

  updateAddCart(): void {
    if (this.products.length > 0) {
      this.userService.updateAddCart(this.products).subscribe(res => {
        this.getProducts();
      })
    }
  }

}

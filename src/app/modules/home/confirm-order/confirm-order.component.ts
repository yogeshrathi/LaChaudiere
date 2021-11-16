import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { IDayCalendarConfig, DatePickerComponent } from 'ng2-date-picker';
@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css']
})
export class ConfirmOrderComponent implements OnInit {

  products: Array<any> = [];
  datePickerConfig = {};
  selectedDate: any
  
  constructor(private userService: UserService,
    private toastr: ToastrService,
    private router: Router) { }

  
  ngOnInit(): void {
    this.getUserCart();
  }

  updateAddCart(product: any, type: any): void {
    if (type == 'add') {
      product.quantity = product.quantity + 1;
    } else if(type == 'remove'){
      product.quantity = 0;
    } 
    else {
      if(product.quantity > 0){
        product.quantity = product.quantity - 1;
      }else{
        return;
      }
    }

    let cart = this.products.filter(prd => {
      if (prd.quantity > 0) {
        return prd;
      }
    })

    this.userService.updateAddCart({ products: cart }).subscribe(res => {
      this.getUserCart();
    })
  }

  getUserCart(): void {
    this.userService.getUserCart().subscribe(res => {
      this.products = res.userCart.products
      if (this.products.length == 0) {
        this.router.navigate(['/home/products'])
      }
    })
  }

  confirmOrder(): void {
    this.userService.confirmOrder({
      products: this.products,
      orderDate: moment(this.selectedDate).format('DD-MMM-yyyy')
    }).subscribe(res => {
      this.toastr.success('Order Placed');
      this.userService.updateAddCart({ products: [] }).subscribe(res => {
        this.getUserCart();
      })
    })
  }
}

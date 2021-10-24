import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css']
})
export class ConfirmOrderComponent implements OnInit {

  products: Array<any> = [];
  constructor(private userService: UserService,
    private toastr: ToastrService,
    private router: Router) { }

  selected = { startDate: moment(new Date()), endDate: moment(new Date().setDate((new Date().getDate() + 30))) };

  ngOnInit(): void {
    this.getUserCart();
  }

  updateAddCart(product: any, type: any): void {
    if (type == 'add') {
      product.quantity = product.quantity + 1;
    } else {
      product.quantity = product.quantity - 1;
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
      orderDate: moment(this.selected.startDate).format('DD-MMM-yyyy') + ' - ' + moment(this.selected.endDate).format('DD-MMM-yyyy')
    }).subscribe(res => {
      this.toastr.success('Order Placed');
      this.userService.updateAddCart({ products: [] }).subscribe(res => {
        this.getUserCart();
      })
    })
  }
}

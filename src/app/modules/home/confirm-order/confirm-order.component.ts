import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { IDayCalendarConfig, DatePickerComponent } from 'ng2-date-picker';
import { IAngularMyDpOptions, IMyDateModel, IMyDefaultMonth } from 'angular-mydatepicker';
@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css']
})
export class ConfirmOrderComponent implements OnInit {

  products: Array<any> = [];
  datePickerConfig = {};
  selectedDate: any;
  maxDate = new Date(new Date().setDate(new Date().getDate() + 30));
  myDpOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'dd.mm.yyyy',
    disableUntil: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() },
    disableSince: { year: this.maxDate.getFullYear(), month: this.maxDate.getMonth() + 1, day: this.maxDate.getDate() },
    disableDates: [],
    inline: true,
    yearSelector: false,
    monthSelector: false,
    sunHighlight: false

    // other options are here...
  };

  model: any = null;

  constructor(private userService: UserService,
    private toastr: ToastrService,
    private router: Router) { }



  ngOnInit(): void {
    this.getUserCart();
    // console.log(this.maxDate);
    this.model = {
      isRange: false
    };

    const date = new Date();

      let disableDates = [];
      let avlDates = []
      avlDates = JSON.parse(localStorage.getItem('a') || '[]');
      while (date <= this.maxDate) {
        date.setDate(date.getDate() + 1);
        console.log(date.getDay());
        if (avlDates.indexOf(date.getDay()) == -1) {
          disableDates.push({ year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() });
        }
      }
      this.myDpOptions.disableDates = disableDates;




  }

  updateAddCart(product: any, type: any): void {
    if (type == 'add') {
      product.quantity = product.quantity + 1;
    } else if (type == 'remove') {
      if (product.quantity > 0) {
        product.quantity = product.quantity - 1;
      } else {
        return;
      }
    } else {
      product.quantity = 0;
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
    if(this.model.singleDate){
      this.userService.confirmOrder({
        products: this.products,
        orderDate: moment(this.model.singleDate.jsDate).format('DD-MMM-yyyy')
      }).subscribe(res => {
        this.toastr.success('Order Placed');
        this.userService.updateAddCart({ products: [] }).subscribe(res => {
          // this.getUserCart();
          this.router.navigate(['/home/order-confirmation'])
        })
      })
    } else{
      this.toastr.error('Please select date');
    }
    
  }
}

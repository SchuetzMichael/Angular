import { Component, OnInit } from '@angular/core';
import {BookStoreService} from '../shared/book-store.service';
import {Order} from '../shared/order';

@Component({
  selector: 'bs-orders',
  templateUrl: './orders.component.html',
  styles: []
})
export class OrdersComponent implements OnInit {
  orders: Order[];

  constructor(private bs:BookStoreService) { }

  ngOnInit() {
    let user_id = localStorage.getItem('userId');
    this.bs.getAllOrdersByUser(user_id).subscribe(res => {console.log(res); this.orders = res});
  }
}

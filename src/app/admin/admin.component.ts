import { Component, OnInit } from '@angular/core';
import {BookStoreService} from '../shared/book-store.service';
import {Order} from '../shared/order';

@Component({
  selector: 'bs-admin',
  templateUrl: './admin.component.html',
  styles: []
})
export class AdminComponent implements OnInit {
  orders: Order[];

  constructor(private bs:BookStoreService) { }

  ngOnInit() {
    this.bs.getAllOrders().subscribe(res => {this.orders = res});
  }
}

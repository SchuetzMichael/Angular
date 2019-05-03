import { Component, OnInit } from '@angular/core';
import {Order} from '../shared/order';
import {OrderFactory} from '../shared/order-factory';
import {ActivatedRoute, Router} from '@angular/router';
import {BookStoreService} from '../shared/book-store.service';

@Component({
  selector: 'bs-order-detail',
  templateUrl: './order-detail.component.html',
  styles: []
})
export class OrderDetailComponent implements OnInit {
  order: Order = OrderFactory.empty();
  constructor(private bs: BookStoreService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.bs.getSingleOrder(params['order_id']).subscribe(res => {this.order = res; console.log(this.order);});
  }

}

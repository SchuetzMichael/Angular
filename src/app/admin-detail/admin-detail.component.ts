import { Component, OnInit } from '@angular/core';
import {Order} from '../shared/order';
import {OrderFactory} from '../shared/order-factory';
import {ActivatedRoute, Router} from '@angular/router';
import {BookStoreService} from '../shared/book-store.service';
import {Status} from '../shared/status';
import {StatusFactory} from '../shared/status-factory';

@Component({
  selector: 'bs-admin-detail',
  templateUrl: './admin-detail.component.html',
  styles: []
})
export class AdminDetailComponent implements OnInit {

  order: Order = OrderFactory.empty();
  status: Status = StatusFactory.empty();
  selectedStatus: string = '';
  comment: string = '';


  constructor(private bs: BookStoreService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.bs.getSingleOrder(params['order_id']).subscribe(res => {this.order = res; console.log(this.order);});

  }

  saveStatus(){
    const params = this.route.snapshot.params;
    this.status.order_id = params['order_id'];
    this.status.comment = this.comment;

    if(this.selectedStatus === ''){
      this.status.status = 'Offen';
    } else {
      this.status.status = this.selectedStatus;
    }

    this.bs.saveNewStatus(this.status).subscribe(res => {
      this.router.navigate(['../'], {relativeTo: this.route});
    });
  }
}

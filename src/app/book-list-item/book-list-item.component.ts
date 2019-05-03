import {Component, Input, OnInit} from '@angular/core';
import {Book} from '../shared/book';
import {BookStoreService} from "../shared/book-store.service";

@Component({
  selector: 'a.bs-book-list-item',
  templateUrl: './book-list-item.component.html',
  styles: []
})
export class BookListItemComponent implements OnInit {

  @Input() book: Book;

  constructor(private bs:BookStoreService) { }

  ngOnInit() {
  }

  changeToComma(value){
    value = value.toFixed(2).toString().replace('.', ',');
    return value;
  }

}

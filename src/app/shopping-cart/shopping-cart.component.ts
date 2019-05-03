import { Component, OnInit } from '@angular/core';
import {BookStoreService} from '../shared/book-store.service';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {BookFactory} from '../shared/book-factory';
import {Item} from '../shared/item';
import {AuthService} from '../shared/authentification.service';
import {OrderFactory} from '../shared/order-factory';
import {isNullOrUndefined} from "util";
import {StatusFactory} from "../shared/status-factory";

@Component({
  selector: 'bs-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styles: []
})
export class ShoppingCartComponent implements OnInit {

  book = BookFactory.empty();
  order = OrderFactory.empty();
  status = StatusFactory.empty();
  cartItems: Item[] = [];
  items: Item[] = [];

  total_brutto: number = 0;
  total_netto: number = 0;
  mwst: number = 0;

  constructor(private bs: BookStoreService,
              private route: ActivatedRoute, private router:Router,
              private authService : AuthService) { }


  ngOnInit() {
    const params = this.route.snapshot.params;

    this.bs.getSingle(params['isbn']).subscribe(b => {
      let isbn = params['isbn'];

      //add new Item to cart or load cart
      if (isbn) {
        //create new Item in cart
        let item = {
          book: this.book = b,
          quantity: 1
        };
        //if the local storage is empty
        if (localStorage.getItem('cart') == null) {
          let cart = [];
          //convert the item into a string for sending to the server and add to the cart
          cart.push(JSON.stringify(item));
          //Set the value of the local storage item
          localStorage.setItem('cart', JSON.stringify(cart));
        } else {
          //if the local storage is not empty
          //get the items from the server and convert it into a object
          let cart = JSON.parse(localStorage.getItem('cart'));
          let index = -1;
          for (let i = 0; i < cart.length; i++) {
            let item = JSON.parse(cart[i]);
            //book is already in cart
            if (item.book.isbn == isbn) {
              index = i;
              break;
            }
          }
          //book is not in cart
          if (index == -1) {
            //add the book to cart and local storage
            cart.push(JSON.stringify(item));
            localStorage.setItem('cart', JSON.stringify(cart));
          } else {
            //book is already in cart, so increase the amount
            let item = JSON.parse(cart[index]);
            item.quantity += 1;
            cart[index] = JSON.stringify(item);
            localStorage.setItem("cart", JSON.stringify(cart));
          }
        }
        this.loadCart();
        this.router.navigate(['..'], { relativeTo: this.route });
      } else {
        if(isNullOrUndefined(localStorage.getItem("cart"))) {
          this.emptyCart();
        } else {
          this.loadCart();
        }
      }
    });

  }

  loadCart() {
    this.total_brutto = 0;
    this.total_netto = 0;
    this.mwst = 0;

    this.items = [];
    let cart = JSON.parse(localStorage.getItem('cart'));
    for (let i = 0; i < cart.length; i++) {
      let item = JSON.parse(cart[i]);
      this.items.push({
        book: item.book,
        quantity: item.quantity
      });
      this.total_brutto += item.book.price * item.quantity;
      this.total_netto = this.total_brutto/1.1;
      this.mwst = this.total_netto - this.total_brutto;
      this.mwst = Math.abs(this.mwst);
    }
  }

  removeOneItem (isbn: string) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    let index = -1;
    for (let i = 0; i < cart.length; i++) {
      let item: Item = JSON.parse(cart[i]);
      if (item.book.isbn == isbn) {
        item.quantity -= 1;
        if(item.quantity > 0){
          cart[i] = JSON.stringify(item);
          break;
        }
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.loadCart();
  }

  addOneItem (isbn: string) {
    let cart: any = JSON.parse(localStorage.getItem('cart'));
    let index: number = -1;
    for (let i = 0; i < cart.length; i++) {
      let item: Item = JSON.parse(cart[i]);
      if (item.book.isbn == isbn) {
        item.quantity += 1;
        cart[i] = JSON.stringify(item);
        break;
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.loadCart();
  }

  removeAllItems(isbn: string) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    for (let i = 0; i < cart.length; i++) {
      let item = JSON.parse(cart[i]);
      if (item.book.isbn == isbn) {
        cart.splice(i, 1);
        break;
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.loadCart();
  }

  submitOrder() {
    if(!isNullOrUndefined(localStorage.getItem("cart"))){
      if(this.isLoggedIn()) {
        let cart = JSON.parse(localStorage.getItem('cart'));
        for (let i = 0; i < cart.length; i++) {
          let item = JSON.parse(cart[i]);
          this.cartItems.push({
            book: item.book,
            quantity: item.quantity
          });
        }

        this.order.items = this.cartItems;
        this.order.user_id = JSON.parse(localStorage.getItem('userId'));
        this.order.date = new Date(this.order.date);
        this.order.total_brutto = this.total_brutto;
        this.order.total_netto = this.total_netto;

        this.bs.saveToCart(this.order).subscribe(res => { });

        localStorage.removeItem("cart");
        this.emptyCart();

      }
      else {
        this.router.navigate(['../login'], { relativeTo: this.route });
      }
    }
  }

  emptyCart(){
    this.total_brutto = 0;
    this.total_netto = 0;
    this.mwst = 0;
    this.items = [];
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

}

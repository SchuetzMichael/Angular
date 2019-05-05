import { Injectable } from '@angular/core';
import {Author, Book, Image} from './book';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Order} from './order';
import {Status} from './status';


@Injectable({
  providedIn: 'root'
})

export class BookStoreService {
  private api = "http://bookstore19.s1610456031.student.kwmhgb.at/api";

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Array<Book>>{
    return this.http.get(`${this.api}/books`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getAllAuthors(): Observable<Array<Author>>{
    return this.http.get(`${this.api}/authors`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getAuthor(id): Observable<Author>{
    return this.http.get(`${this.api}/author/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }
  getSingle(isbn): Observable<Book>{
    return this.http.get(`${this.api}/book/${isbn}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  create(book:Book):Observable<any>{
    return this.http.post(`${this.api}/book`, book).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  update(book:Book):Observable<any>{
    return this.http.put(`${this.api}/book/${book.isbn}`, book).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  remove(isbn:String):Observable<any>{
    return this.http.delete(`${this.api}/book/${isbn}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getAllSearch(searchTerm: string): Observable<Array<Book>>{
    return this.http.get(`${this.api}/book/search/${searchTerm}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getAllSearchAuthor(searchTerm: string): Observable<Array<Author>>{
    return this.http.get(`${this.api}/author/search/${searchTerm}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  saveToCart(order:Order): Observable<any>{
    return this.http.post(`${this.api}/order`, order).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getAllOrders(): Observable<Array<Order>>{
    return this.http.get(`${this.api}/admin`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getAllOrdersByUser(user_id): Observable<Array<Order>>{
    return this.http.get(`${this.api}/orders/${user_id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getSingleOrder(order_id): Observable<Order>{
    return this.http.get(`${this.api}/admin/${order_id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  saveNewStatus(status:Status):Observable<any>{
    return this.http.put(`${this.api}/admin`, status).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}

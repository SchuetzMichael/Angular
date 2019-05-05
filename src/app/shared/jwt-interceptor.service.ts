import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
  HttpResponse
} from "@angular/common/http";

import {Injectable} from "@angular/core";
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()
export class JwtInterceptorService
implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          console.log("error");
          alert("Invalid login");
        }
      }
    }));
  }
}

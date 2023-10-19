import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    // nếu có token thì thêm cấu hình vào request
    if (token) {
      let modified = req.clone({
        setHeaders: {
          Authoriztion: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return next.handle(modified);
    }
    // nếu không thì next luôn
    return next.handle(req);
  }
}

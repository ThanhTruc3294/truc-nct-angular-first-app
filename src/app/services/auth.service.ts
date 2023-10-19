import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthServices {
  constructor(private router: Router) {
  }
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  isLogin() {
    return (
      localStorage.getItem('token') != '' &&
      localStorage.getItem('token') != undefined
    );
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  // Hàm này sẽ được gọi khi người dùng đăng nhập thành công
  login() {
    if (this.isLogin()) {
      this.isLoggedInSubject.next(true);
    } else {
      this.isLoggedInSubject.next(false);
    }
  }

  // Hàm này sẽ được gọi khi người dùng đăng xuất
  logout() {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login'])
  }
}

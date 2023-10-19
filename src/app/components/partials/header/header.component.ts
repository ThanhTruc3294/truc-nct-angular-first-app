import { Component, OnInit } from '@angular/core';
import { AuthServices } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  cartQuantity = 0;
  isLogin = false;
  isLoginPage = false;
  constructor(cartService:CartService, private auth: AuthServices,private router: Router ) {
    cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    });

    this.auth.isLoggedIn$.subscribe(newVal => {
      this.isLogin = newVal;
    });

   }
   logout() {
    this.auth.logout();
   }
  ngOnInit(): void {
  }

}

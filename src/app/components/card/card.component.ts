import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/Cart';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, OnChanges {
  @Input() cards: any = []
  @Output() outChangeQuantity = new EventEmitter<{cartItem: Cart, value: string}>();
  @Output() outRemoveFromCart = new EventEmitter<Cart>();
  count = 1;
  changeData() {
    console.log(this.count);
    this.count += 1;
  }
  // @Output changeQuantity(
  ngOnInit(): void {
    console.log('ngOnInit')

  }
  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      const chng = changes[propName];
      const cur  = JSON.stringify(chng.currentValue);
      const prev = JSON.stringify(chng.previousValue);
      console.log(cur, prev)

    }
  }

  changeQuantity(cartItem: Cart, value: string) {
    this.outChangeQuantity.emit({cartItem, value});
  }
  removeFromCart(cartItem: Cart) {
    this.outRemoveFromCart.emit(cartItem);
  }
  alert(number: number) {
    console.log(number);
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FoodService,  } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent implements OnInit {
  food!: Food;
  allFood: Food[] = [];
  id: string = '';
  listFoods = []


  listSub = [];
  constructor(activatedRoute:ActivatedRoute, private foodService:FoodService,
    private cartService:CartService, private router: Router) {
    activatedRoute.params.subscribe((params) => {
      if(params['id'])
      // this.food = foodService.getFoodById(params['id']);
      this.food = this.allFood.find(f => f.id == params['id']) || new Food();
      this.id = params['id'];
    })
  }

  ngOnInit(): void {
    this.foodService.getAllFood().subscribe((food: Food[]) => {
      this.allFood = food;
      this.food = this.allFood.find(f => f.id == this.id) || new Food();
    })


  }

  addToCart(){
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }

  addFood(food: number) {
    this.foodService.loadFood(food);
  }
}

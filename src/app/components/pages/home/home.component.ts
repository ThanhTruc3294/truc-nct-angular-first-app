import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';
import { Tag } from 'src/app/shared/models/Tag';
import {DataService } from 'src/app/services/data.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {
  tags: Tag[] = []
  foods: Food[] = [];
  constructor(private foodService: FoodService, activatedRoute: ActivatedRoute, private dataService: DataService) {
    this.tags = this.foodService.getAllTags();
    activatedRoute.params.subscribe((params) => {
      if (params['searchTerm'])
        this.foods = this.foodService.getAllFoodsBySearchTerm(params['searchTerm']);
      else if (params['tag'])
        this.foods = this.foodService.getAllFoodsByTag(params['tag']);
      // else
        // this.foods = foodService.getAll();
    })

  }

  ngOnInit(): void {
    this.dataService.logName();
    this.dataService.changeName('Nam');
    this.dataService.logName();

    this.foodService.getAllFood().subscribe((food: Food[]) => {
      this.foods = food;
      console.log('food', this.foods);
    })
    console.log(this.tags);
  }

}

import { Injectable } from '@angular/core';
import { sample_foods, sample_tags } from 'src/data';
import { Food } from '../shared/models/Food';
import { Tag } from '../shared/models/Tag';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, switchMap, catchError,tap, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  food: Food[] = [];
  constructor(private http: HttpClient) {}
  getAll(): Food[] {
    return sample_foods;
  }
  getAllFood(): Observable<any> {
    // return sample_foods;
     return this.http.get('https://node-js-app-sandy.vercel.app/get-food');
  }
  getAllFoodsBySearchTerm(searchTerm: string) {
    return this.getAll().filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()))
    // let food: Food[] = [];
    // this.getAll().subscribe((foods: Food[]) => {
    //   food = foods.filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()));
    // })
    // return food;

  }

  getAllTags(): Tag[] {
    return sample_tags;
  }

  getAllFoodsByTag(tag: string): Food[] {
    return tag === "All" ?
      this.getAll() :
      this.getAll().filter(food => food.tags?.includes(tag));
  }

  getFoodById(foodId:string):Food{
    return this.getAll().find(food => food.id == foodId) ?? new Food();
    // return [];
  }


  private listFoods = new Subject<number>();
  listFoods$ = this.listFoods.pipe(
    switchMap(_id => this.http.get(`https://node-js-app-sandy.vercel.app/get-food`).pipe(
      catchError(error => {
        console.error('Get food failed', error);
        return of({ data: [] });
      })
    )),
    tap((foods: any) => {
      console.log(foods, 'foods 1')
      return foods[0]['label'] = 'New Food'})
  );

  loadFood(relateFood: number) {
    console.log('loadfood', relateFood);
    // const listFood = [...this.listFoods, food] ;
    this.listFoods.next(relateFood);
  }
}

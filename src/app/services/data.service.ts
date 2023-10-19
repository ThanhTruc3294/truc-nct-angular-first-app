import { Injectable } from '@angular/core';
import { sample_foods, sample_tags } from 'src/data';
import { Food } from '../shared/models/Food';
import { Tag } from '../shared/models/Tag';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, switchMap, catchError,tap, of } from 'rxjs';


@Injectable()
export class DataService {
  name: string = '';
  constructor(private http: HttpClient) {
    this.name = 'Trúc';
  }

  changeName(name: string) {
    console.log(name, 'name');
    this.name = name;
  }

  logName() {
    console.log(this.name, 'logName')
  }
}

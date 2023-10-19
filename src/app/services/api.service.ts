import { Injectable } from '@angular/core';
import { sample_foods, sample_tags } from 'src/data';
import { Food } from '../shared/models/Food';
import { Tag } from '../shared/models/Tag';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, switchMap, catchError,tap, of } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class APIServices {
  constructor(private http: HttpClient) {}

  login(params: {username: string, password: string}): Observable<any> {
    const {username, password} = params;
    return this.http.post(environment.apiUrl + '/login', {username, password});
  }
}

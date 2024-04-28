import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environment";
import {IncomeCategory} from "../../interfaces/income-category";

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(
    private http: HttpClient,
  ) { }

  base_url:string  = environment.base_url

  getUserCategories(userId: number):Observable<any> {

    console.log(`${this.base_url}income/categories`)

    return this.http.post(`${this.base_url}income/categories`, {'userId': userId});

  }

}

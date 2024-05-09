import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environment";
import {IncomeCategory} from "../../interfaces/income-category";
import {Income} from "../../interfaces/income";

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(
    private http: HttpClient,
  ) { }

  base_url:string  = environment.base_url

  access_token: string | null = localStorage.getItem('token')

  category_base_url: string =  `${this.base_url}income/categories`

  getUserCategories():Observable<any> {

    console.log(`${this.base_url}income/categories`, this.category_base_url)

    return this.http.post(`${this.category_base_url}`, {}, {headers: {'Authorization': `Bearer ${this.access_token}`}});

  }

  addIncomeCategory(data: IncomeCategory): Observable<any> {
    console.log('income category observable', data)
    return this.http.post<IncomeCategory>(`${this.category_base_url}/store`, data, {headers: {'Authorization': `Bearer ${this.access_token}`}});
  }


  getIncome(): Observable<any> {
    return this.http.get(`${this.base_url}income/`, {headers: {'Authorization': `Bearer ${this.access_token}`}});
  }

  addIncome(data: Income): Observable<any> {
    return this.http.post<Income>(`${this.base_url}income/store`, data, {headers: {'Authorization': `Bearer ${this.access_token}`}});
  }

}

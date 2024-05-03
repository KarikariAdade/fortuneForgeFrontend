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

  access_token: string | null = localStorage.getItem('token')

  category_base_url: string =  `${this.base_url}income/categories`

  getUserCategories():Observable<any> {

    console.log(`${this.base_url}income/categories`, this.category_base_url)

    return this.http.post(`${this.category_base_url}`, {}, {headers: {'Authorization': `Bearer ${this.access_token}`}});

  }

  addIncomeCategory(data: IncomeCategory): Observable<any> {
    return this.http.post<IncomeCategory>(`${this.category_base_url}store`, data);
  }

}

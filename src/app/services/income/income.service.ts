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

  category_base_url: string =  `${this.base_url}income/categories/`

  getUserCategories(userId: number):Observable<any> {

    console.log(`${this.base_url}income/categories`)

    return this.http.post(`${this.category_base_url}`, {'userId': userId});

  }

  addIncomeCategory(data: IncomeCategory): Observable<any> {
    return this.http.post<IncomeCategory>(`${this.category_base_url}store`, data);
  }

}

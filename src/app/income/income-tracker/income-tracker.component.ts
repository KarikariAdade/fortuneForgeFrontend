import { Component } from '@angular/core';
import {NavigationComponent} from "../../layouts/navigation/navigation.component";
import {HomeHeaderComponent} from "../../layouts/home-header/home-header.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-income-tracker',
  standalone: true,
  imports: [
    NavigationComponent,
    HomeHeaderComponent,
    RouterLink
  ],
  templateUrl: './income-tracker.component.html',
  styleUrl: './income-tracker.component.css'
})
export class IncomeTrackerComponent {

  categoryLink = '/income/categories';

  categoryButtonName = 'Income Categories';
  pageName: string = 'Income Tracker';

}

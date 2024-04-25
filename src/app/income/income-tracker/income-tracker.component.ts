import { Component } from '@angular/core';
import {NavigationComponent} from "../../navigation/navigation.component";

@Component({
  selector: 'app-income-tracker',
  standalone: true,
    imports: [
        NavigationComponent
    ],
  templateUrl: './income-tracker.component.html',
  styleUrl: './income-tracker.component.css'
})
export class IncomeTrackerComponent {

}

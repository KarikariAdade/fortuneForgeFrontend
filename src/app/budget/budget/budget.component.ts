import { Component } from '@angular/core';
import {NavigationComponent} from "../../navigation/navigation.component";

@Component({
  selector: 'app-budget',
  standalone: true,
    imports: [
        NavigationComponent
    ],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.css'
})
export class BudgetComponent {

}

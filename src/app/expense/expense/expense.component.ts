import { Component } from '@angular/core';
import {NavigationComponent} from "../../layouts/navigation/navigation.component";

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [
    NavigationComponent
  ],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css'
})
export class ExpenseComponent {

}

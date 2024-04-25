import { Component } from '@angular/core';
import {NavigationComponent} from "../../navigation/navigation.component";

@Component({
  selector: 'app-transaction',
  standalone: true,
    imports: [
        NavigationComponent
    ],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent {

}

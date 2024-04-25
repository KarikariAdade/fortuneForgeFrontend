import { Component } from '@angular/core';
import {NavigationComponent} from "../../navigation/navigation.component";

@Component({
  selector: 'app-savings',
  standalone: true,
    imports: [
        NavigationComponent
    ],
  templateUrl: './savings.component.html',
  styleUrl: './savings.component.css'
})
export class SavingsComponent {

}

import { Component } from '@angular/core';
import {faHomeLg} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NavigationComponent} from "../navigation/navigation.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FontAwesomeModule, NavigationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  faHome = faHomeLg
}

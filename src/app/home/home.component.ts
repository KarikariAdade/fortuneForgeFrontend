import { Component } from '@angular/core';
import {faHomeLg} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NavigationComponent} from "../layouts/navigation/navigation.component";
import {HomeHeaderComponent} from "../layouts/home-header/home-header.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FontAwesomeModule, NavigationComponent, HomeHeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  faHome = faHomeLg
}

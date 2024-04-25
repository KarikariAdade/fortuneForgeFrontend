import { Component } from '@angular/core';
import {faHomeLg} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {
  faHome = faHomeLg
}

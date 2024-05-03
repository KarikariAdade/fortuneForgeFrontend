import { Component } from '@angular/core';
import {faHomeLg, faPlusCircle, faPowerOff} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {User} from "../../interfaces/user";

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, RouterLinkActive],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  faHome = faHomeLg
  protected readonly faPowerOff = faPowerOff;

  constructor(private authService: AuthService, private router: Router) {
  }

  user = localStorage.getItem('user')

  signOut() {
    this.authService.logoutUser().subscribe({
      next: () => {
        this.authService.removeToken()
        this.authService.removeUserData()
        this.router.navigate(['/auth/signin']);
      },
      error: errors => {
        console.log(errors);
      }
    })
  }

  protected readonly faPlusCircle = faPlusCircle;
}

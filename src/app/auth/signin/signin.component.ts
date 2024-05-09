import {Component, OnInit, Renderer2} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {NgIf} from "@angular/common";
import {PasswordMatchValidator} from "../../configurations/PasswordConfirmation";

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private renderer: Renderer2
  ) {
    this.renderer.removeStyle(document.body, 'background-image')
  }

  signInForm: FormGroup = new FormGroup({});

  hasError = false;

  errorMessage: string = '';
  messageClass: string = '';

  submitSignInForm() {
    this.authService.loginUser(this.signInForm.value)
      .subscribe({
        next: (response => {

          if (Object.keys(response.data).length > 0) {

            delete response.data.password

            this.authService.setToken(response.token)

            this.authService.setUserData(response.data)

            this.router.navigate(['/'])
          }
        }),
        error: (errors => {
          this.hasError = true;

          this.messageClass = 'alert alert-danger';

          this.errorMessage = errors.error.message;
        })
      })
  }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

}

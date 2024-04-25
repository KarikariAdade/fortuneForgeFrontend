import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {Form, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {AuthService} from "../../services/auth.service";
import {PasswordMatchValidator} from "../../configurations/PasswordConfirmation";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {
  }

  signUpForm: FormGroup = new FormGroup({});

  hasError = false;

  errorMessage: string = '';
  messageClass: string = '';

  submitSignUpForm() {

    this.authService.registerUser(this.signUpForm.value)
      .subscribe({
        next: data => {
          this.messageClass = 'alert alert-success';
          this.errorMessage = "Account created successfully. You are being redirected to the login page.";
          this.hasError = true;
          setTimeout(() => {
            this.router.navigate(['/auth/signin']);
          }, 5000);
        },
        error: errors => {

            this.hasError = true;

            this.messageClass = 'alert alert-danger';

            this.errorMessage = this.authService.getErrors(errors)
        }
      })

  }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      'name': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'phone': new FormControl('', [Validators.required, Validators.minLength(10)]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'password_confirmation': new FormControl('', [Validators.required]),
      'role': new FormControl('USER')
    }, {
      validator:PasswordMatchValidator('password', 'password_confirmation')
    })
  }


}

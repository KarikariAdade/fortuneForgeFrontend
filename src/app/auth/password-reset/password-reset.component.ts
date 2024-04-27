import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {ErrorMessageComponent} from "../../layouts/error-message/error-message.component";
import {NgIf} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PasswordMatchValidator} from "../../configurations/PasswordConfirmation";

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [
    ErrorMessageComponent,
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.css'
})
export class PasswordResetComponent implements OnInit{

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private authService: AuthService, private formBuilder: FormBuilder) {
  }

  token:string = '';
  resetPasswordForm: FormGroup = new FormGroup<any>({});

  hasError = false;

  errorMessage: string = '';
  messageClass: string = '';


  submitResetPasswordForm() {
    this.authService.resetPassword(this.resetPasswordForm.value).subscribe({
      next: response => {
        console.log(response, 'success response')
        this.messageClass = 'alert alert-success';
        this.errorMessage = response.message;
        this.hasError = true;
        setTimeout(() => {
          this.router.navigate(['/auth/signin']);
        }, 5000);
      },
      error: errors => {
        console.log(errors, 'error response')
        this.hasError = true;
        this.errorMessage = this.authService.getErrors(errors)
        this.messageClass = 'alert alert-danger';
      }
    })
    console.log('Submit Reset Password', this.resetPasswordForm.value)
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      console.log(data);
      this.token = data['token']
    })

    this.resetPasswordForm = this.formBuilder.group({
      'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'password_confirmation': new FormControl('', [Validators.required]),
      'token': new FormControl(this.token, [Validators.required])
    }, {
      validator:PasswordMatchValidator('password', 'password_confirmation')
    })
  }

}

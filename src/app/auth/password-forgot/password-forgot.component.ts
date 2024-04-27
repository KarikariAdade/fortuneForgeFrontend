import {Component, OnInit, Renderer2} from '@angular/core';
import {NgIf} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {ErrorMessageComponent} from "../../layouts/error-message/error-message.component";
import {AuthService} from "../../services/auth.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-password-forgot',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    ErrorMessageComponent
  ],
  templateUrl: './password-forgot.component.html',
  styleUrl: './password-forgot.component.css'
})
export class PasswordForgotComponent implements OnInit{

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private renderer: Renderer2) {
    this.renderer.removeStyle(document.body, 'background-image')
  }

  forgotPasswordForm: FormGroup = new FormGroup<any>({})
  hasError = false;

  errorMessage: string = '';
  messageClass: string = '';

  submitForgotPasswordForm() {

    this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe({
      next: data => {
        this.hasError = true;
        this.messageClass = 'alert alert-success';
        this.errorMessage = data.message;
        console.log(data, 'success response')

      },
      error: errors => {
        console.log('error response', errors)
        this.hasError = true;

        this.messageClass = 'alert alert-danger';

        this.errorMessage = this.authService.getErrors(errors)
      }
    })

  }

  ngOnInit(): void {

    this.forgotPasswordForm = this.formBuilder.group({
      'email': new FormControl('', [Validators.required, Validators.email])
    })
  }
}

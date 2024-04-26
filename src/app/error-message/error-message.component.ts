import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.css'
})
export class ErrorMessageComponent {

  @Input() messageClass: string = ''; // Class for styling error message
  @Input() hasError: boolean = false; // Flag to determine if error should be displayed
  @Input() errorMessage: string = ''; // Error message to display

}

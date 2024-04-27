import {Component, OnInit} from '@angular/core';
import {NavigationComponent} from "../../layouts/navigation/navigation.component";
import {HomeHeaderComponent} from "../../layouts/home-header/home-header.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    NavigationComponent,
    HomeHeaderComponent,
    FaIconComponent,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './income-tracker-categories.component.html',
  styleUrl: './income-tracker-categories.component.css'
})
export class IncomeTrackerCategoriesComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
  }

  incomeLink: string = '/income';

  incomeButtonName: string = 'View Income';

  pageName: string = "Income Categories"

  addCategoryToggle: boolean = false;

  protected readonly faPlusCircle = faPlusCircle;

  applyMarginTop: string = '';

  addIncomeCategoryForm: FormGroup = new FormGroup({});

  toggleForm() {
    this.applyMarginTop = !this.addCategoryToggle ? 'mt-9' : '';
    this.addCategoryToggle = !this.addCategoryToggle
  }

  ngOnInit(): void {
    console.log(this.authService.getUserData())
  }
}

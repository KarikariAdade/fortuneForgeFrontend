import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NavigationComponent} from "../../layouts/navigation/navigation.component";
import {HomeHeaderComponent} from "../../layouts/home-header/home-header.component";
import {Event, RouterLink} from "@angular/router";
import {DatatableComponent} from "../../datatables/datatable/datatable.component";
import {ActionButtonsComponent} from "../../layouts/action-buttons/action-buttons.component";
import {IncomeCategory} from "../../interfaces/income-category";
import {IncomeService} from "../../services/income/income.service";
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {Income} from "../../interfaces/income";
import {DateService} from "../../services/date.service";
import {ErrorMessageComponent} from "../../layouts/error-message/error-message.component";
import {MatTable, MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {IncomeData} from "../../datatables/IncomeDatasource";
import {IncomeDataDataSource, IncomeDataItem} from "../../income-data/income-data-datasource";



@Component({
  selector: 'app-income-tracker',
  standalone: true,
  imports: [
    NavigationComponent,
    HomeHeaderComponent,
    RouterLink,
    DatatableComponent,
    ReactiveFormsModule,
    NgForOf,
    FaIconComponent,
    NgIf,
    ErrorMessageComponent,
    MatTableModule,
    MatSortHeader,
    MatButton,
    MatFormField,
    MatInput,
    MatSort,
    MatPaginator,
    MatProgressSpinner
  ],
  templateUrl: './income-tracker.component.html',
  styleUrl: './income-tracker.component.css'
})


export class IncomeTrackerComponent implements OnInit{



  constructor(
    private incomeService: IncomeService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private dateService: DateService
  ) {
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Income>;

  incomes:Income[] = [];

  dataSource: IncomeData = new IncomeData(this.incomes);
  // dataSource:MatTableDataSource<Income, MatPaginator> = new MatTableDataSource<Income>([]);

  categoryLink = '/income/categories';

  categoryButtonName = 'Income Categories';

  pageName: string = 'Income Tracker';

  protected readonly faPlusCircle = faPlusCircle;

  incomeAddForm: FormGroup = new FormGroup({})

  incomeCategories:IncomeCategory[] = [];

  addCategoryToggle: boolean = false;

  hasError = false;

  errorMessage: string = '';

  messageClass: string = '';


  displayedColumns:string[] = ['id', 'name'];



  addIncome() {
    console.log(this.incomeAddForm.value);

    // this.incomeService.addIncome(this.incomeAddForm.value).subscribe({
    //   next: response => {
    //     console.log(response,'success response')
    //     this.hasError = true;
    //     this.messageClass = 'alert alert-success';
    //     this.errorMessage = response.message;
    //
    //     // this.onPushDataToRow(response.data)
    //   },
    //   error: errors => {
    //     console.log(errors, 'error response')
    //     this.hasError = true;
    //
    //     this.messageClass = 'alert alert-danger';
    //
    //     this.errorMessage = this.authService.getErrors(errors)
    //   }
    // })
  }


  ngOnInit(): void {
    this.addIncomeFormBuilder();

    this.loadIncome()

    this.loadIncomeCategories();
  }

  private loadIncome() {
    this.incomeService.getIncome().subscribe({
      next: response => {
        this.incomes = response.data.map((data: Income) => {
          return {
            id: data.id,
            name: data.name,
            amount: data.amount,
            startDate: data.startDate ? this.dateService.generateDate(new Date(data.startDate)) : null,
            endDate: data.endDate ? this.dateService.generateDate(new Date(data.endDate)) : null,
            recurring: data.recurring,
            incomeCategory: data.incomeCategory?.name
          }
        })
        console.log(this.incomes, 'income response');

        this.dataSource = new IncomeData(this.incomes)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
        console.log(this.dataSource, 'datasource', this.table.dataSource)
      },
      error: errors => {
        console.log('income error', errors);
      }
    })
  }

  private addIncomeFormBuilder() {
    this.incomeAddForm = this.formBuilder.group({
      'name': new FormControl('', [Validators.required]),
      'amount': new FormControl('', [Validators.required, Validators.min(1)]),
      'startDate': new FormControl('', [Validators.required]),
      'endDate': new FormControl('', [Validators.required]),
      'incomeCategory': new FormControl('', [Validators.required]),
      'isRecurring': new FormControl(''),
      'description': new FormControl(''),
    })
  }

  private loadIncomeCategories() {
    this.incomeService.getUserCategories().subscribe({
      next: response => {
        if (response.data && Object.keys(response.data).length !== 0) {
          this.incomeCategories = response.data.map((category: IncomeCategory) => {
            return {
              name: category.name,
              description: category.description,
              id: category.id

            }
          })

        }
      },
      error: errors => {
        console.log('income error', errors);
      }
    })
  }


  toggleForm(){
    this.addCategoryToggle = !this.addCategoryToggle
  }


}

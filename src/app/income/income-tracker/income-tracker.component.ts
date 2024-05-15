import {Component, OnInit, ViewChild} from '@angular/core';
import {NavigationComponent} from "../../layouts/navigation/navigation.component";
import {HomeHeaderComponent} from "../../layouts/home-header/home-header.component";
import {RouterLink} from "@angular/router";
import {DatatableComponent} from "../../datatables/datatable/datatable.component";
import {IncomeCategory} from "../../interfaces/income-category";
import {IncomeService} from "../../services/income/income.service";
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCloudDownloadAlt, faEdit, faPlusCircle, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Income} from "../../interfaces/income";
import {DateService} from "../../services/date.service";
import {ErrorMessageComponent} from "../../layouts/error-message/error-message.component";
import {MatTable, MatTableModule} from "@angular/material/table";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatPaginator} from "@angular/material/paginator";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {IncomeData} from "../../datatables/IncomeDatasource";
import {MatCheckbox} from "@angular/material/checkbox";
import {SelectionModel} from "@angular/cdk/collections";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatTableExporterModule} from "mat-table-exporter";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";


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
    MatProgressSpinner,
    MatLabel,
    MatCheckbox,
    MatTableExporterModule,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
  ],
  templateUrl: './income-tracker.component.html',
  styleUrl: './income-tracker.component.css'
})


export class IncomeTrackerComponent implements OnInit{

  constructor(
    private incomeService: IncomeService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private dateService: DateService,
    private snackbar: MatSnackBar
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

  addUpdateToggle: boolean = false;

  hasError = false;

  errorMessage: string = '';

  messageClass: string = '';

  highlightedRows:Income[] = []

  displayedColumns:string[] = ['id', 'name', 'amount', 'startDate', 'endDate', 'recurring', 'incomeCategory', 'action'];

  selection = new SelectionModel<Income>(true, []);

  updateIncomeForm: FormGroup = new FormGroup({})

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;

    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {

    if (this.isAllSelected()) {

      this.selection.clear();

      this.highlightedRows = [];

      return;
    }

    this.dataSource.data.forEach((row: Income) => {

      const isRowHighlighted = this.highlightedRows.some((item:Income) => item.id === row.id)

      if (!isRowHighlighted){

        this.highlightedRows.push({
          id: row.id,
          name: row.name,
          description: row.description,
          recurring: row.recurring,
          amount: row.amount,
          incomeCategory: row.incomeCategory,
        })

      }

    })

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: Income): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  showAllSelected(row: Income, event:MouseEvent){
    event.stopPropagation()

    if (this.selection.isSelected(row)) {
      const isRowHighlighted = this.highlightedRows.some((item:Income) => item.id === row.id)

      if (!isRowHighlighted){

        this.highlightedRows.push({
          id: row.id,
          name: row.name,
          description: row.description,
          recurring: row.recurring,
          amount: row.amount,
          incomeCategory: row.incomeCategory,
        })

      }

    }else {

      const selectedItem = this.highlightedRows.findIndex(item => row.id === item.id)

      if (selectedItem !== -1) {

        this.highlightedRows.splice(selectedItem, 1)

      }
    }

  }

  addIncome() {

    this.incomeService.addIncome(this.incomeAddForm.value).subscribe({
      next: response => {
        this.generateSuccessResponse(response);
        this.addNewData(response.data)
      },
      error: errors => {
        this.generateFailureResponse(errors)
      }
    })
  }


  ngOnInit(): void {
    this.generateFormBuilder(this.incomeAddForm, null);

    this.loadIncome();

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
            startDate: data.startDate ? this.dateService.generateDate(new Date(data.startDate).toString(), false) : null,
            endDate: data.endDate ? this.dateService.generateDate(new Date(data.endDate).toString(), false) : null,
            recurring: data.recurring,
            incomeCategory: data.incomeCategory?.name
          }
        })

        this.dataSource = new IncomeData(this.incomes)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      },
      error: errors => {
        this.snackbar.open('Error: Could not load resource. Kindly retry', 'Ok')
      }
    })
  }


  public generateFormBuilder(formGroup: FormGroup, data:Income|null) {

    formGroup.addControl('name', new FormControl('', [Validators.required]));
    formGroup.addControl('id', new FormControl(''));
    formGroup.addControl('amount', new FormControl('', [Validators.required, Validators.min(1)]));
    formGroup.addControl('startDate', new FormControl('', [Validators.required]));
    formGroup.addControl('endDate', new FormControl('', [Validators.required]));
    formGroup.addControl('incomeCategory', new FormControl('', [Validators.required]));
    formGroup.addControl('recurring', new FormControl('', [Validators.required]));
    formGroup.addControl('description', new FormControl(''));

    if(data != null) {

      let category:IncomeCategory | undefined = this.incomeCategories.find(category => category.name === data.incomeCategory)

      formGroup.patchValue({
        'id': data.id,
        'name': data.name,
        'amount': data.amount,
        'startDate': data.startDate ? this.dateService.generateDate(new Date(data.startDate).toString(), true) : null,
        'endDate': data.endDate ? this.dateService.generateDate(new Date(data.endDate).toString(), true) : null,
        'incomeCategory': category?.id,
        'recurring': data.recurring ? 1 : 0,
        'description': data.description,
      } )

    }
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
        this.snackbar.open('Error: Could not load resource. Kindly retry', 'Ok')
        console.log('income error', errors);
      }
    })
  }


  toggleAddIncomeForm(){
    this.addCategoryToggle = !this.addCategoryToggle
    if (this.addUpdateToggle){
      this.addUpdateToggle = false;
    }
  }

  toggleUpdateIncomeForm(){
    this.addUpdateToggle = true;
    if (this.addCategoryToggle){
      this.addCategoryToggle = false;
    }
  }

  addNewData(data:Income) {

    this.dataSource.data = [data, ...this.dataSource.data];

    console.log('data source data', this.dataSource.data)

    this.table.renderRows()

    this.ngOnInit()
  }

  protected readonly faTrash = faTrash;
  protected readonly faEdit = faEdit;
  protected readonly faCloudDownloadAlt = faCloudDownloadAlt;

  generateEditData(row: Income) {
    this.toggleUpdateIncomeForm()
    this.generateFormBuilder(this.updateIncomeForm, row)
  }

  updateIncome() {
    this.incomeService.updateIncome(this.updateIncomeForm.value).subscribe({
      next: response => {
        console.log('update response', response)
        this.generateSuccessResponse(response);
        this.ngOnInit();
      },
      error: errors => {
        this.generateFailureResponse(errors);
      }
    })
  }

  private generateFailureResponse(errors:any) {
    this.hasError = true;

    this.messageClass = 'alert alert-danger';

    this.errorMessage = this.authService.getErrors(errors)
  }

  private generateSuccessResponse(response: any) {
    this.hasError = true;
    this.messageClass = 'alert alert-success';
    this.errorMessage = response.message;
  }

  deleteIncome(data: Income) {
    console.log('income data delete', data)
    this.incomeService.deleteIncome(data).subscribe({
      next: response => {
        this.generateSuccessResponse(response)
        console.log('response', response)
        this.ngOnInit()
      },
      error: errors => {
        this.generateFailureResponse(errors)
      }
    })
  }

  deleteSelectedIncomes() {
    console.log(this.highlightedRows)

    this.incomeService.bulkDelete(this.highlightedRows).subscribe({
      next: response => {
        console.log(response)
        this.highlightedRows = [];
        this.generateSuccessResponse(response)
        this.ngOnInit()
      },
      error: errors => {
        console.log(errors)
        this.generateFailureResponse(errors)
      }
    })
  }
}

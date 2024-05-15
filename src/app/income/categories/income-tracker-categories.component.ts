import {Component, OnInit, ViewChild} from '@angular/core';
import {NavigationComponent} from "../../layouts/navigation/navigation.component";
import {HomeHeaderComponent} from "../../layouts/home-header/home-header.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCloudDownloadAlt, faEdit, faPlusCircle, faTrash} from "@fortawesome/free-solid-svg-icons";
import {NgIf} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import { AgGridAngular } from 'ag-grid-angular'; // AG Grid Component
import {IncomeService} from "../../services/income/income.service";
import {ErrorMessageComponent} from "../../layouts/error-message/error-message.component";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {Income} from "../../interfaces/income";
import {IncomeData} from "../../datatables/IncomeDatasource";
import {IncomeCategoryDatasource} from "../../datatables/IncomeCategoryDatasource";
import {IncomeCategory} from "../../interfaces/income-category";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatTableExporterModule} from "mat-table-exporter";
import {SelectionModel} from "@angular/cdk/collections";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";


@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    NavigationComponent,
    HomeHeaderComponent,
    FaIconComponent,
    NgIf,
    ReactiveFormsModule,
    AgGridAngular,
    ErrorMessageComponent,
    MatCell,
    MatCellDef,
    MatCheckbox,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatSort,
    MatSortHeader,
    MatTable,
    MatTableExporterModule,
    MatHeaderCellDef,
    MatNoDataRow,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
  ],
  templateUrl: './income-tracker-categories.component.html',
  styleUrl: './income-tracker-categories.component.css'
})

export class IncomeTrackerCategoriesComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private incomeService: IncomeService,
    private snackbar: MatSnackBar
  ) {
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<IncomeCategory>;

  incomeCategories:IncomeCategory[] = [];

  dataSource: IncomeCategoryDatasource = new IncomeCategoryDatasource(this.incomeCategories);

  incomeLink: string = '/income';

  incomeButtonName: string = 'View Income';

  pageName: string = "Income Categories"

  addCategoryToggle: boolean = false;

  hasError = false;

  errorMessage: string = '';

  messageClass: string = '';

  protected readonly faPlusCircle = faPlusCircle;

  applyMarginTop: string = '';

  protected readonly faCloudDownloadAlt = faCloudDownloadAlt;

  addIncomeCategoryForm: FormGroup = new FormGroup({});

  displayedColumns:string[] = ['id', 'name', 'description'];

  highlightedRows:IncomeCategory[] = []
  selection = new SelectionModel<IncomeCategory>(true, []);

  ngOnInit(): void {

    this.addIncomeCategoryForm = this.formBuilder.group({
      'name': new FormControl('', [Validators.required]),
      'description': new FormControl(''),
    })

    this.incomeService.getUserCategories().subscribe({
      next: response => {
        if (Object.keys(response.data).length > 0) {
          this.incomeCategories = response.data.map((category: IncomeCategory) => {
            return {
              name: category.name,
              description: category.description,
              id: category.id
            }
          })
          this.dataSource = new IncomeCategoryDatasource(this.incomeCategories)
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.table.dataSource = this.dataSource;
        }

      },
      error: errors => {
        this.snackbar.open('Error: Could not load resource. Kindly retry', 'Ok')
      }
    })

  }

  toggleForm(){
    this.applyMarginTop = !this.addCategoryToggle ? 'mt-9' : '';
    this.addCategoryToggle = !this.addCategoryToggle
  }




  submitIncomeCategoryForm() {
    this.incomeService.addIncomeCategory(this.addIncomeCategoryForm.value).subscribe({
      next: data => {
        this.hasError = true;
        this.messageClass = 'alert alert-success';
        this.errorMessage = data.message;
      },
      error: errors => {
        this.hasError = true;

        this.messageClass = 'alert alert-danger';

        this.errorMessage = this.authService.getErrors(errors)
      }
    })
    console.log(this.addIncomeCategoryForm.value)
  }

  protected readonly faEdit = faEdit;
  protected readonly faTrash = faTrash;

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

    this.dataSource.data.forEach((row: IncomeCategory) => {

      const isRowHighlighted = this.highlightedRows.some((item:IncomeCategory) => item.id === row.id)

      if (!isRowHighlighted){

        this.highlightedRows.push({
          id: row.id,
          name: row.name,
          description: row.description,
        })

      }

    })

    this.selection.select(...this.dataSource.data);
  }


  checkboxLabel(row?: IncomeCategory): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  showAllSelected(row: IncomeCategory, event:MouseEvent){
    event.stopPropagation()

    if (this.selection.isSelected(row)) {
      const isRowHighlighted = this.highlightedRows.some((item:IncomeCategory) => item.id === row.id)

      if (!isRowHighlighted){

        this.highlightedRows.push({
          id: row.id,
          name: row.name,
          description: row.description,
        })

      }

    }else {

      const selectedItem = this.highlightedRows.findIndex(item => row.id === item.id)

      if (selectedItem !== -1) {

        this.highlightedRows.splice(selectedItem, 1)

      }
    }

  }
}

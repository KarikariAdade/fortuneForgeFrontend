import {Component, OnInit} from '@angular/core';
import {NavigationComponent} from "../../layouts/navigation/navigation.component";
import {HomeHeaderComponent} from "../../layouts/home-header/home-header.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCloudDownloadAlt, faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {NgIf} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import { AgGridAngular } from 'ag-grid-angular'; // AG Grid Component
import { ColDef, CsvExportModule, GridApi, GridReadyEvent, GridOptions, GetRowIdParams, GetRowIdFunc } from 'ag-grid-community';
import {IncomeService} from "../../services/income/income.service";
import {User} from "../../interfaces/user";
import {IncomeCategory} from "../../interfaces/income-category";
import {ActionButtonsComponent} from "../../layouts/action-buttons/action-buttons.component";
import {ErrorMessageComponent} from "../../layouts/error-message/error-message.component";


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
  ],
  templateUrl: './income-tracker-categories.component.html',
  styleUrl: './income-tracker-categories.component.css'
})

export class IncomeTrackerCategoriesComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private incomeService: IncomeService) {
  }

  incomeLink: string = '/income';

  incomeButtonName: string = 'View Income';

  pageName: string = "Income Categories"

  addCategoryToggle: boolean = false;

  hasError = false;

  errorMessage: string = '';

  messageClass: string = '';

  private gridApi!: GridApi;

  protected readonly faPlusCircle = faPlusCircle;

  applyMarginTop: string = '';

  userData: User = JSON.parse(`${this.authService.getUserData()}`);

  addIncomeCategoryForm: FormGroup = new FormGroup({});

  public rowSelection: "single" | "multiple" = "multiple";

  public getRowId: GetRowIdFunc = (params: GetRowIdParams) => {
    return params.data.id;
  };

  rowStyle = {width: '1180px'}

  rowData: any[] = [

  ];

  public colDefs: ColDef[] = [
    { field: "id", hide: true, sortable: true},
    { field: "name", resizable: true, sortable: true},
    { field: "description", resizable: true , sortable: true},
    { field: "action", resizable: true, cellRenderer: ActionButtonsComponent },
  ];


  ngOnInit(): void {

    this.addIncomeCategoryForm = this.formBuilder.group({
      'name': new FormControl('', [Validators.required]),
      'description': new FormControl(''),
    })

    this.incomeService.getUserCategories().subscribe({
      next: response => {
        console.log('category response', response);

        if (response.data && Object.keys(response.data).length !== 0) {

          this.rowData = response.data.map((category: IncomeCategory) => {
            return {
              name: category.name,
              description: category.description,
              id: category.id

            }
          })

        }
      },
      error: errors => {
        console.log('category error', errors);
      }
    })

  }

  toggleForm(){
    this.applyMarginTop = !this.addCategoryToggle ? 'mt-9' : '';
    this.addCategoryToggle = !this.addCategoryToggle
  }

  onGridReady(params: GridReadyEvent<IncomeCategory>) {
    console.log('GridReady', params);

    this.gridApi = params.api;
  }


  onBtnExport() {
    this.gridApi.exportDataAsCsv();
  }

  rowDataB: any =
    {
      name: 'category name',
      description: 'category.description',
      id: 33

    }

    // adds new row to the rows

  pushDataToRow() {
    const newData = this.rowData.slice();
    newData.splice(0, 0, this.rowDataB)
    // this.rowData.push(this.rowDataB)));

    this.gridApi.setGridOption("rowData", newData);
  }

  deleteDataFromRow(){
    const selectedRowNodes = this.gridApi.getSelectedNodes()
    console.log(selectedRowNodes, 'selected nodes')
    const selectedIDs = selectedRowNodes.map(function (rowNode){
      console.log('row nod id', rowNode)
      return rowNode.data.id;
    })

    console.log('rowdata before filter', this.rowData.length)

    this.rowData = this.rowData.filter( dataItem => !selectedIDs.includes(dataItem.id))
    console.log('rowdata after filter', this.rowData.length, this.rowData)

    this.gridApi.setGridOption("rowData", this.rowData);
  }

  protected readonly faCloudDownloadAlt = faCloudDownloadAlt;


  submitIncomeCategoryForm() {
    this.incomeService.addIncomeCategory(this.addIncomeCategoryForm.value).subscribe({
      next: data => {
        console.log('income category success fresponse', data)
        this.hasError = true;
        this.messageClass = 'alert alert-success';
        this.errorMessage = data.message;
      },
      error: errors => {
        console.log('income category error response', errors)
        this.hasError = true;

        this.messageClass = 'alert alert-danger';

        this.errorMessage = this.authService.getErrors(errors)
      }
    })
    console.log(this.addIncomeCategoryForm.value)
  }
}

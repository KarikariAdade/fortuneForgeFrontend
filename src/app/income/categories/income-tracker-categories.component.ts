import {Component, OnInit} from '@angular/core';
import {NavigationComponent} from "../../layouts/navigation/navigation.component";
import {HomeHeaderComponent} from "../../layouts/home-header/home-header.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import { AgGridAngular } from 'ag-grid-angular'; // AG Grid Component
import { ColDef, CsvExportModule, GridApi, GridReadyEvent, GridOptions, GetRowIdParams, GetRowIdFunc } from 'ag-grid-community';
import {IncomeService} from "../../services/income/income.service";
import {User} from "../../interfaces/user";
import {IncomeCategory} from "../../interfaces/income-category";
import {ActionButtonsComponent} from "../../layouts/action-buttons/action-buttons.component";


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

  private gridApi!: GridApi;

  protected readonly faPlusCircle = faPlusCircle;

  applyMarginTop: string = '';

  userData: User = JSON.parse(`${this.authService.getUserData()}`);

  addIncomeCategoryForm: FormGroup = new FormGroup({});

  public rowSelection: "single" | "multiple" = "multiple";

  public getRowId: GetRowIdFunc = (params: GetRowIdParams) => {
    return params.data.id;
  };

  toggleForm() {
    this.applyMarginTop = !this.addCategoryToggle ? 'mt-9' : '';
    this.addCategoryToggle = !this.addCategoryToggle
  }

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


    this.incomeService.getUserCategories(Number(this.userData.id)).subscribe({
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




    console.log(this.userData, typeof(this.userData))
  }

  onGridReady(params: GridReadyEvent<IncomeCategory>) {
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
}

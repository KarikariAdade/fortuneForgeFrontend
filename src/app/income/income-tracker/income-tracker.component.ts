import {Component, OnInit} from '@angular/core';
import {NavigationComponent} from "../../layouts/navigation/navigation.component";
import {HomeHeaderComponent} from "../../layouts/home-header/home-header.component";
import {RouterLink} from "@angular/router";
import {DatatableComponent} from "../../datatables/datatable/datatable.component";
import {ColDef} from "ag-grid-community";
import {ActionButtonsComponent} from "../../layouts/action-buttons/action-buttons.component";
import {IncomeCategory} from "../../interfaces/income-category";
import {IncomeService} from "../../services/income/income.service";
import {AuthService} from "../../services/auth.service";
import {User} from "../../interfaces/user";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";

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
    NgIf
  ],
  templateUrl: './income-tracker.component.html',
  styleUrl: './income-tracker.component.css'
})
export class IncomeTrackerComponent implements OnInit{

  constructor(
    private incomeService: IncomeService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) {
  }

  categoryLink = '/income/categories';

  categoryButtonName = 'Income Categories';

  pageName: string = 'Income Tracker';

  userData: User = JSON.parse(`${this.authService.getUserData()}`);

  incomeAddForm: FormGroup = new FormGroup({})

  incomeCategories:IncomeCategory[] = [];

  addCategoryToggle: boolean = false;

  rowData: any[] = [

  ];

  public colDefs: ColDef[] = [
    { field: "id", hide: true, sortable: true},
    { field: "name", resizable: true, sortable: true},
    { field: "description", resizable: true , sortable: true},
    { field: "action", resizable: true, cellRenderer: ActionButtonsComponent },
  ];

  ngOnInit(): void {

    this.incomeAddForm = this.formBuilder.group({
      'name': new FormControl('', [Validators.required]),
      'amount': new FormControl('', [Validators.required, Validators.min(1)]),
      'startDate': new FormControl('', [Validators.required]),
      'endDate': new FormControl('', [Validators.required]),
      'incomeCategory': new FormControl('', [Validators.required]),
      'isRecurring': new FormControl('',),
      'description': new FormControl('', [Validators.required]),
    })

    this.incomeService.getUserCategories().subscribe({
      next: response => {
        console.log('category response', response);

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
        console.log('category error', errors);
      }
    })
  }

  // pushDataToRow() {
  //   const newData = this.rowData.slice();
  //   newData.splice(0, 0, this.rowDataB)
  //   // this.rowData.push(this.rowDataB)));
  //
  //   this.gridApi.setGridOption("rowData", newData);
  // }
  //
  // deleteDataFromRow(){
  //   const selectedRowNodes = this.gridApi.getSelectedNodes()
  //   console.log(selectedRowNodes, 'selected nodes')
  //   const selectedIDs = selectedRowNodes.map(function (rowNode){
  //     console.log('row nod id', rowNode)
  //     return rowNode.data.id;
  //   })
  //
  //   console.log('rowdata before filter', this.rowData.length)
  //
  //   this.rowData = this.rowData.filter( dataItem => !selectedIDs.includes(dataItem.id))
  //   console.log('rowdata after filter', this.rowData.length, this.rowData)
  //
  //   this.gridApi.setGridOption("rowData", this.rowData);
  // }

  onPushDataToRow() {
    return function () {
    };
  }

  onDeleteDataFromRow() {
    return function () {
    };
  }

  toggleForm(){
    this.addCategoryToggle = !this.addCategoryToggle
  }

  protected readonly faPlusCircle = faPlusCircle;
}

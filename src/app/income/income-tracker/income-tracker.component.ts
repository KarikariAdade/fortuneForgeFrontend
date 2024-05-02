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

@Component({
  selector: 'app-income-tracker',
  standalone: true,
  imports: [
    NavigationComponent,
    HomeHeaderComponent,
    RouterLink,
    DatatableComponent
  ],
  templateUrl: './income-tracker.component.html',
  styleUrl: './income-tracker.component.css'
})
export class IncomeTrackerComponent implements OnInit{

  constructor(private incomeService: IncomeService, private authService: AuthService) {
  }

  categoryLink = '/income/categories';

  categoryButtonName = 'Income Categories';
  pageName: string = 'Income Tracker';

  userData: User = JSON.parse(`${this.authService.getUserData()}`);


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
}

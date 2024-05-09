import {Component, Input, OnInit} from '@angular/core';
import {AgGridAngular} from "ag-grid-angular";
import {ColDef, GetRowIdFunc, GetRowIdParams, GridApi, GridReadyEvent} from "ag-grid-community";
import {ActionButtonsComponent} from "../../layouts/action-buttons/action-buttons.component";
import {IncomeCategory} from "../../interfaces/income-category";
import {IncomeService} from "../../services/income/income.service";
import {User} from "../../interfaces/user";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-datatable',
  standalone: true,
    imports: [
        AgGridAngular
    ],
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.css'
})
export class DatatableComponent implements OnInit{

  constructor(private incomeService: IncomeService, private authService: AuthService) { }

  @Input()
  gridApi!: GridApi;

  public rowSelection: "single" | "multiple" = "multiple";

  public getRowId: GetRowIdFunc = (params: GetRowIdParams) => {
    return params.data.id;
  };

  userData: User = JSON.parse(`${this.authService.getUserData()}`);

  rowStyle = {width: '1180px'}

  @Input()
  rowData: any[] = [

  ];

  @Input()
  public colDefs: ColDef[] = []

  @Input()
  onPushDataToRow!: (data: any) => void

  @Input()
  onDeleteDataFromRow!: () => void

  ngOnInit(): void {

  }

  @Input()
  onGridReady!: (params:GridReadyEvent<any>) => void


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

}

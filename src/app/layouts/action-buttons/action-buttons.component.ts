import {Component, Input} from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";

@Component({
  selector: 'app-action-buttons',
  standalone: true,
  imports: [],
  // templateUrl: './action-buttons.component.html',
  template: `<div class=""><button class="btn btn-primary btn-sm" style="margin-right: 10px;" (click)="editCategory(category_id)">Edit</button>
    <button class="btn btn-danger btn-sm" (click)="deleteCategory(category_id)">Delete</button></div>`,
  styleUrl: './action-buttons.component.css'
})
export class ActionButtonsComponent implements  ICellRendererAngularComp{

  category_id: string = '';

  agInit(params: ICellRendererParams): void {
    console.log('params data', params.data.id)
    this.category_id = params.data.id;
  }

  refresh(params: ICellRendererParams<any>): boolean {
    return false;
  }

  editCategory(id: string) {
    alert(id)
  }

  deleteCategory(id: string) {
    alert(id)
  }

}

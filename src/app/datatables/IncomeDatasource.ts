import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {merge, Observable, of as observableOf} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {map} from "rxjs/operators";
import {Income} from "../interfaces/income";

export class IncomeData extends DataSource<Income> {

  data: Income[] = [];

  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(incomes: Income[]) {

    super();

    this.setData(incomes)

  }



  connect(): Observable<Income[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  disconnect(): void {
  }


  private getPagedData(data: Income[]): Income[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  private getSortedData(data: Income[]): Income[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return this.compare(a.name, b.name, isAsc);
        case 'id': return this.compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: string | number, b: string | number, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  setData(data:Income[]):void {
    this.data = data;
  }

}

import {IncomeCategory} from "./income-category";
import {User} from "./user";

export interface Income {
  id: number;
  name: string | number;
  description?: string;
  endDate?: Date;
  startDate?: Date;
  recurring?: boolean
  amount?: number
  incomeCategory?: IncomeCategory,
}

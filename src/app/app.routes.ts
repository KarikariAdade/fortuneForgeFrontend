import { Routes } from '@angular/router';
import {NotFoundComponent} from "./not-found/not-found.component";
import {HomeComponent} from "./home/home.component";
import {BudgetComponent} from "./budget/budget/budget.component";
import {ExpenseComponent} from "./expense/expense/expense.component";
import {IncomeTrackerComponent} from "./income/income-tracker/income-tracker.component";
import {ReminderComponent} from "./reminders/reminder/reminder.component";
import {SavingsComponent} from "./savings/savings/savings.component";
import {TransactionComponent} from "./transactions/transaction/transaction.component";
import {SigninComponent} from "./auth/signin/signin.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {AuthGuard} from "./guards/auth.guard";
import {PasswordForgotComponent} from "./auth/password-forgot/password-forgot.component";
import {PasswordResetComponent} from "./auth/password-reset/password-reset.component";

export const routes: Routes = [
  {path: 'auth', children: [
      {path: 'signup', component: SignupComponent},
      {path: 'signin', component: SigninComponent},
      {path: 'password/forgot', component: PasswordForgotComponent},
      {path: 'password/reset', component: PasswordResetComponent}
    ]},
  {path: '', component: HomeComponent, canActivate:[AuthGuard]},
  {path: 'budget', component: BudgetComponent, canActivate:[AuthGuard]},
  {path: 'expenses', component: ExpenseComponent, canActivate:[AuthGuard]},
  {path: 'income', component: IncomeTrackerComponent, canActivate:[AuthGuard]},
  {path: 'reminders', component: ReminderComponent, canActivate:[AuthGuard]},
  {path: 'savings', component: SavingsComponent, canActivate:[AuthGuard]},
  {path: 'transactions', component: TransactionComponent, canActivate:[AuthGuard]},
  {path: '**', component: NotFoundComponent}
];

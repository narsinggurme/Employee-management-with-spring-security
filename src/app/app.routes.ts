import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'employees', component: EmployeeListComponent },
    { path: 'create-employee', component: CreateEmployeeComponent },
    { path: 'update-employee/:id', component: UpdateEmployeeComponent },
    { path: 'employee-details/:id', component: EmployeeDetailsComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' } // default redirect to login

];

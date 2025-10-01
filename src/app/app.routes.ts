import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { authGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { adminGuard } from './guards/role.guard';


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'profile', component: EmployeeProfileComponent, canActivate: [authGuard] },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'employees', component: EmployeeListComponent, canActivate: [adminGuard] },
    { path: 'create-employee', component: CreateEmployeeComponent, canActivate: [adminGuard] },
    { path: 'update-employee/:id', component: UpdateEmployeeComponent },
    { path: 'employee-details/:id', component: EmployeeDetailsComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';

const routes: Routes = [
  {path : 'homepage',component:HomepageComponent},
  {path : 'create',component:CreateEmployeeComponent},
  {path : 'login',component:LoginComponent},
  {path: 'employee/:id',component:EmployeeDetailsComponent},
  {path: '', component : HomepageComponent,pathMatch :"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

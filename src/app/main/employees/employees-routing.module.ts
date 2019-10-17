import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {EmployeesComponent} from "./list-employees/employees.component";
import {EmployeeComponent} from "./employee/employee.component";

const routes: Routes = [
  {
    path: ':id',
    component: EmployeeComponent
  },
  {
    path: '',
    component: EmployeesComponent
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule {}

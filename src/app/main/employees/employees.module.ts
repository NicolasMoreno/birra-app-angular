import {NgModule} from "@angular/core";
import {EmployeesRoutingModule} from "./employees-routing.module";
import {EmployeesComponent} from "./list-employees/employees.component";
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbToastrService
} from "@nebular/theme";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {EmployeeComponent} from "./employee/employee.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {EmployeeService} from "../../shared/employee.service";
import {ProfileService} from "../../shared/profile.service";

@NgModule({
  declarations: [EmployeesComponent, EmployeeComponent],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbInputModule,
    NbSelectModule,
    Ng2SmartTableModule,
  ],
  providers: [EmployeeService, ProfileService, NbToastrService]
})
export class EmployeesModule {}

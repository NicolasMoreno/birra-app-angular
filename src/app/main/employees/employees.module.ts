import {NgModule} from "@angular/core";
import {EmployeesRoutingModule} from "./employees-routing.module";
import {EmployeesComponent} from "./list-employees/employees.component";
import {NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbSelectModule} from "@nebular/theme";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {EmployeeComponent} from "./employee/employee.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [EmployeesComponent, EmployeeComponent],
  imports: [
    EmployeesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbInputModule,
    NbSelectModule,
    Ng2SmartTableModule,
  ]
})
export class EmployeesModule {}

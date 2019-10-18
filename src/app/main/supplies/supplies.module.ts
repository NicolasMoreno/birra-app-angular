import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NbButtonModule, NbCardModule, NbIconModule, NbInputModule} from "@nebular/theme";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {SuppliesRoutingModule} from "./supplies-routing.module";
import {SuppliesComponent} from "./list-supplies/supplies.component";
import {SupplyComponent} from "./supply/supply.component";

@NgModule({
  declarations: [SuppliesComponent, SupplyComponent],
  imports: [
    SuppliesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbIconModule,
    NbCardModule,
    NbInputModule,
    Ng2SmartTableModule,
  ]
})
export class SuppliesModule {}

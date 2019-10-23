import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbToastrService} from "@nebular/theme";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {SuppliesRoutingModule} from "./supplies-routing.module";
import {SuppliesComponent} from "./list-supplies/supplies.component";
import {SupplyComponent} from "./supply/supply.component";
import {StockService} from "../../shared/stock.service";
import {HttpClient} from "@angular/common/http";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [SuppliesComponent, SupplyComponent],
  imports: [
    CommonModule,
    SuppliesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbIconModule,
    NbCardModule,
    NbInputModule,
    Ng2SmartTableModule,
  ],
  providers: [ NbToastrService, StockService]
})
export class SuppliesModule {}

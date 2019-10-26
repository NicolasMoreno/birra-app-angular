import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {NbButtonModule, NbCardModule, NbIconModule, NbToastrService} from "@nebular/theme";
import {DashboardComponent} from "./dashboard.component";
import {ListOrdersComponent} from "./list-orders/list-orders.component";
import {OrderService} from "../../shared/order.service";

@NgModule({
  declarations: [DashboardComponent, ListOrdersComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    Ng2SmartTableModule
  ],
  providers: [NbToastrService, OrderService]
})

export class DashboardModule {}

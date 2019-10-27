import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbToastrService
} from "@nebular/theme";
import {DashboardComponent} from "./dashboard.component";
import {ListOrdersComponent} from "./list-orders/list-orders.component";
import {OrderService} from "../../shared/order.service";
import {StatusRendererComponent} from "./table-render/status-renderer.component";
import {DateRendererComponent} from './table-render/date-renderer.component';
import {ProcessRendererComponent} from "./table-render/process-renderer.component";
import {NewOrderComponent} from "./new-order/new-order.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProductService} from "../../shared/product.service";

@NgModule({
  declarations: [DashboardComponent,
    ListOrdersComponent,
    NewOrderComponent,
    StatusRendererComponent,
    DateRendererComponent,
    ProcessRendererComponent
  ],
  entryComponents: [StatusRendererComponent,
    DateRendererComponent,
    ProcessRendererComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbSelectModule,
    Ng2SmartTableModule
  ],
  providers: [NbToastrService, OrderService, ProductService]
})

export class DashboardModule {}

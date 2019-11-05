import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard.component";
import {NgModule} from "@angular/core";
import {NewOrderComponent} from "./new-order/new-order.component";
import {OrderDetailComponent} from "./sub-order/order-detail.component";

const routes: Routes = [
  {
    path: 'new',
    component: NewOrderComponent
  },
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'detail/:id',
    component: OrderDetailComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}

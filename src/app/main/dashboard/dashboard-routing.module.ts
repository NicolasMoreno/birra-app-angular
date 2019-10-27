import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard.component";
import {NgModule} from "@angular/core";
import {NewOrderComponent} from "./new-order/new-order.component";

const routes: Routes = [
  {
    path: 'new',
    component: NewOrderComponent
  },
  {
    path: '',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}

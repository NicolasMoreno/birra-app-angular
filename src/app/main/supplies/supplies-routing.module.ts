import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {SuppliesComponent} from "./list-supplies/supplies.component";
import {SupplyComponent} from "./supply/supply.component";

const routes: Routes = [
  {
    path: ':id',
    component: SupplyComponent
  },
  {
    path: '',
    component: SuppliesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliesRoutingModule {}

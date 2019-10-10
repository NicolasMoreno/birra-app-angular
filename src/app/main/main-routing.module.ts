import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HelloMainComponent} from "./helloMain/hello-main.component";
import {MainComponent} from "./main.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'test',
        component: HelloMainComponent,
      },
      { path: '', redirectTo: 'test', pathMatch: 'full'}
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}

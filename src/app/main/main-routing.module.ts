import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HelloMainComponent} from "./helloMain/hello-main.component";
import {MainComponent} from "./main.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      // {
      //   path: 'test',
      //   component: HelloMainComponent,
      // },
      {
        path: 'employees',
        loadChildren: () => import('./employees/employees.module')
          .then( module => module.EmployeesModule)
      },
      {
        path: 'profiles',
        loadChildren: () => import('./profiles/profiles.module')
          .then( m => m.ProfilesModule)
      },
      {
        path: 'supplies',
        loadChildren: () => import('./supplies/supplies.module')
          .then( m => m.SuppliesModule)
      },
      { path: '', redirectTo: 'employees', pathMatch: 'full'}
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}

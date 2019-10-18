import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ProfilesComponent} from "./list-profiles/profiles.component";
import {ProfileComponent} from "./profile/profile.component";

const routes: Routes = [
  {
    path: ':id',
    component: ProfileComponent
  },
  {
    path: '',
    component: ProfilesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilesRoutingModule {}

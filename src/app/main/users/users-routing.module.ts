import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {UsersComponent} from "./list-users/users.component";
import {UserComponent} from "./user/user.component";

const routes: Routes = [
  {
    path: ':id',
    component: UserComponent
  },
  {
    path: '',
    component: UsersComponent
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}

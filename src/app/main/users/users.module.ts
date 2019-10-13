import {NgModule} from "@angular/core";
import {UsersRoutingModule} from "./users-routing.module";
import {UsersComponent} from "./list-users/users.component";
import {NbButtonModule, NbCardModule, NbIconModule, NbInputModule} from "@nebular/theme";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {UserComponent} from "./user/user.component";

@NgModule({
  declarations: [UsersComponent, UserComponent],
  imports: [
    UsersRoutingModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbInputModule,
    Ng2SmartTableModule,
  ]
})
export class UsersModule {}

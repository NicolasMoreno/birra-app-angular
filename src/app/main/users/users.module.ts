import {NgModule} from "@angular/core";
import {UsersRoutingModule} from "./users-routing.module";
import {UsersComponent} from "./list-users/users.component";
import {NbButtonModule, NbCardModule, NbIconModule} from "@nebular/theme";
import {Ng2SmartTableModule} from "ng2-smart-table";

@NgModule({
  declarations: [UsersComponent],
  imports: [
    UsersRoutingModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    Ng2SmartTableModule,
  ]
})
export class UsersModule {}

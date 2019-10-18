import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NbButtonModule, NbCardModule, NbCheckboxModule, NbIconModule, NbInputModule} from "@nebular/theme";
import {ProfilesRoutingModule} from "./profiles-routing.module";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {ProfilesComponent} from "./list-profiles/profiles.component";
import {ProfileComponent} from "./profile/profile.component";

@NgModule({
  declarations: [ProfilesComponent, ProfileComponent],
  imports: [
    ProfilesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbIconModule,
    NbCardModule,
    NbInputModule,
    NbCheckboxModule,
    Ng2SmartTableModule,
  ]
})
export class ProfilesModule {}

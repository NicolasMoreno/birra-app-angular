import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbToastrService
} from "@nebular/theme";
import {ProfilesRoutingModule} from "./profiles-routing.module";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {ProfilesComponent} from "./list-profiles/profiles.component";
import {ProfileComponent} from "./profile/profile.component";
import {ProfileService} from "../../shared/profile.service";
import {SectorService} from "../../shared/sector.service";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [ProfilesComponent, ProfileComponent],
  imports: [
    CommonModule,
    ProfilesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbIconModule,
    NbCardModule,
    NbInputModule,
    NbCheckboxModule,
    Ng2SmartTableModule,
  ],
  providers: [ProfileService, SectorService, NbToastrService]
})
export class ProfilesModule {}

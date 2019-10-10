import {NgModule} from '@angular/core';
import {MainRoutingModule} from "./main-routing.module";
import {MainComponent} from "./main.component";
import {ThemeModule} from "../@theme/theme.module";
import {NbMenuModule} from "@nebular/theme";
import {MiscellaneousModule} from "../pages/miscellaneous/miscellaneous.module";
import {HelloMainModule} from "./helloMain/hello-main.module";

@NgModule({
  imports: [
    MainRoutingModule,
    ThemeModule,
    NbMenuModule,
    HelloMainModule,
    MiscellaneousModule,
  ],
  declarations: [MainComponent],
})
export class MainModule {}

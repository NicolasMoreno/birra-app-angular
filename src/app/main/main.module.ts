import {NgModule} from '@angular/core';
import {MainRoutingModule} from "./main-routing.module";
import {MainComponent} from "./main.component";
import {ThemeModule} from "../@theme/theme.module";
import {NbMenuModule} from "@nebular/theme";
import {HelloMainModule} from "./helloMain/hello-main.module";

@NgModule({
  imports: [
    MainRoutingModule,
    ThemeModule,
    NbMenuModule,
    HelloMainModule,
  ],
  declarations: [MainComponent],
})
export class MainModule {}

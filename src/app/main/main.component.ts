import {Component} from "@angular/core";
import {NAV_ITEMS} from "./nav-items";

@Component({
  selector : 'app-main',
  styleUrls: ['./main.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class MainComponent {

  menu = NAV_ITEMS;
}

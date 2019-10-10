import {Component} from "@angular/core";
import {MENU_ITEMS} from "../pages/pages-menu";

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

  menu = MENU_ITEMS;
}

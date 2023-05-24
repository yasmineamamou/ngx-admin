import { Component } from '@angular/core';
import { NbMenuItem, NbMenuService } from '@nebular/theme';
import { MENU_ITEMS } from './pages-menu';
import { AuthService } from "./../services/auth.service";
import { UserService } from '../services/user.service';
@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {
  menu = MENU_ITEMS;
}

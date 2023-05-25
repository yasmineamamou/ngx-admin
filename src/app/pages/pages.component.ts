import { Component } from '@angular/core';
import { NbMenuItem, NbMenuService } from '@nebular/theme';
import { MENU_ITEMS_Admin } from './pages-menuAdmin';
import { AuthService } from "./../services/auth.service";
import { UserService } from '../services/user.service';
import { MENU_ITEMS_Employer } from './pages-menuEmployer';
import { HttpClient } from '@angular/common/http';
import { MENU_ITEMS_Facture } from './pages_menuFacture';
@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  templateUrl: './page.component.html',

})
export class PagesComponent {
  menuEmployer = MENU_ITEMS_Employer;
  menuAdmin = MENU_ITEMS_Admin;
  menuFacture = MENU_ITEMS_Facture;
  constructor(private http: HttpClient, private userService: UserService) { }

  userRole: string = sessionStorage.getItem('role');
}
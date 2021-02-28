import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsersService } from '../../services/users.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems: any[] = [];
  public usuario: Usuario;

  constructor( private sidebarService: SidebarService, public usersService: UsersService ) { 
    this.usuario = usersService.usuario;
  }

  ngOnInit(): void {
    this.menuItems = this.sidebarService.menu;
    console.log(this.menuItems);
    
  }

  logOut() {
    this.usersService.logOut();
  }
}

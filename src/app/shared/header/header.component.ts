import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public usuario: Usuario;

  constructor( private usersService: UsersService) { 
    this.usuario = usersService.usuario;
  }

  ngOnInit(): void {
  }

  logOut() {
    this.usersService.logOut();
  }
}

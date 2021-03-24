import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/' }
      ]
    },
    {
      titulo: 'Mantenimientos',
      icon: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Tables & Deliveries', url: 'tables'},
        { titulo: 'Users', url: 'users' },
        { titulo: 'Producto', url: 'products' }
      ]
    }
  ]

  constructor() { }
}

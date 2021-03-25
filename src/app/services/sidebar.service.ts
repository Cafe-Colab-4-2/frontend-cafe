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
        { titulo: 'Tables & Deliveries', url: 'tables-deliveries'},
        { titulo: 'Users', url: 'users' },
        { titulo: 'Clients', url: 'clients'},
        { titulo: 'Products', url: 'products' }, 
      ]
    }
  ]

  constructor() { }
}

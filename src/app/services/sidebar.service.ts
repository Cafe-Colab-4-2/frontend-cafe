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
        { titulo: 'Dashboard', url: '/' },
        { titulo: 'ProgressBar', url: 'progress' },
        { titulo: 'Promises', url: 'promises' },
        { titulo: 'Rxjs', url: 'rxjs'}
      ]
    }
  ]

  constructor() { }
}

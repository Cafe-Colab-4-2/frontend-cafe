import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme');
  private links: NodeListOf<Element>;
  public url;

  constructor() {
    const url = localStorage.getItem('href') || './assets/css/colors/default-dark.css';
    this.linkTheme.setAttribute('href', url);
   }
 
   changeTheme(theme: string) {
    this.url = `./assets/css/colors/${ theme }.css`;
    this.linkTheme.setAttribute('href', this.url);
    localStorage.setItem('href', this.url);

    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    this.links = document.querySelectorAll('.selector');
    this.links.forEach( elem => {
      elem.classList.remove('working');
      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeURL = `./assets/css/colors/${ btnTheme }.css`;
      const currentTheme = this.linkTheme.getAttribute('href');

      if( btnThemeURL === currentTheme ) {
        elem.classList.add('working');
      }
    });
  }

}

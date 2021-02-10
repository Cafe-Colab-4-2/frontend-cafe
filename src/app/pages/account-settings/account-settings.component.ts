import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  public linkTheme = document.querySelector('#theme');
  public links: NodeListOf<Element>;
  public url = ``;

  constructor() { }

  ngOnInit(): void {
    this.links = document.querySelectorAll('.selector');
    this.checkCurrentTheme();

  }

  changeTheme(theme: string) {
    this.url = `./assets/css/colors/${ theme }.css`;
    this.linkTheme.setAttribute('href', this.url);
    localStorage.setItem('href', this.url);

    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
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

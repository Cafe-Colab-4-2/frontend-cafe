import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {
  public linkTheme = document.querySelector('#theme');

  constructor() { }

  ngOnInit(): void {
    const url = localStorage.getItem('href') || './assets/css/colors/default-dark.css';
    this.linkTheme.setAttribute('href', url);
  }

}

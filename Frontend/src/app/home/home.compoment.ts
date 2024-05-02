import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLogged: boolean = false;

  ngOnInit() {
    const userLoggedString = localStorage.getItem('user_logged');

    this.isLogged = !!userLoggedString;
  }
}
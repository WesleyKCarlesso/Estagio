import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../data-services/user.data-service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  users: any[] = [];
  user: any = {};
  
  constructor(private userDataService: UserDataService) {}

  ngOnInit() {
  }
}

import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../data-services/user.data-service';
import { SnackBarService } from '../data-services/snack-bar.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  users: any[] = [];
  user: any = {};
  loginForm!: FormGroup;
  
  constructor(private userDataService: UserDataService, private snackBarService: SnackBarService, private router: Router) {}

  ngOnInit() {
    this.getTest();
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  getTest() {
    this.userDataService.getAll().subscribe({
      next: (data: any) => {
        debugger;
      },
      error: (error) => {
        debugger;
      }
    });
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  authenticate() {
    this.userDataService.authenticate(this.user).subscribe({
      next: (data: any) => {
        this.snackBarService.openSnackBar('Login realizado com sucesso.', "Entendido");

        this.router.navigate(['/home']);

        if (data.user) {
          localStorage.setItem('user_logged', JSON.stringify(data));
        }
        else {
          this.snackBarService.openSnackBar('Usuário inválido.', "Entendido");
        }
      },
      error: (error) => {
        console.error('Erro ao realizar login:', error);
        let errorMessage = 'Erro ao realizar login. Por favor, tente novamente mais tarde.';
        if (error.status == 400) {
          this.snackBarService.openSnackBar(error.error, "Entendido");
        }
        else {
          this.snackBarService.openSnackBar(errorMessage, "Entendido");
        }
      }
    });
  }
}

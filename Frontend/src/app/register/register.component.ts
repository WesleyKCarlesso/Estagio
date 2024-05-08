import { Component, OnInit, NgZone } from '@angular/core';
import { UserDataService } from '../data-services/user.data-service';
import { SnackBarService } from '../data-services/snack-bar.service';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user: any = {};
  registerForm!: FormGroup;

  constructor(private userDataService: UserDataService, private snackBarService: SnackBarService, private router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    }, { validators: this.checkPasswords })
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value
    return pass === confirmPass ? null : { notSame: true }
  }

  get name() {
    return this.registerForm.get('name')!;
  }

  get email() {
    return this.registerForm.get('email')!;
  }

  get password() {
    return this.registerForm.get('password')!;
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword')!;
  }

  registrar() {
    if (this.registerForm.invalid) {
      return;
    }

    this.user.schedules = [];
    this.user.sex = 2;
    this.user.phone = '43999999999';

    this.userDataService.create(this.user).subscribe({
      next: () => {
        this.snackBarService.openSnackBar('Usuário cadastrado com sucesso!', "Entendido");

        this.userDataService.authenticate(this.user).subscribe({
          next: (data: any) => {
            this.snackBarService.openSnackBar('Login realizado com sucesso.', "Entendido");
    
            this.router.navigate(['/home']);

            if (data.user) {
              localStorage.setItem('user_logged', JSON.stringify(data));
            }
          },
          error: (error) => {
            console.error('Erro ao realizar login:', error);
            let errorMessage = 'Erro ao realizar login. Por favor, tente novamente mais tarde.';
          }
        });
      },
      error: (error) => {
        console.error('Erro ao cadastrar usuário:', error);
        let errorMessage = 'Erro ao cadastrar usuário. Por favor, tente novamente mais tarde.';
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
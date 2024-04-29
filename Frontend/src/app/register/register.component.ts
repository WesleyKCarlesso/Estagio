import { Component, OnInit, NgZone } from '@angular/core';
import { UserDataService } from '../data-services/user.data-service';
import { SnackBarService } from '../data-services/snack-bar.service';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user: any = {};
  registerForm!: FormGroup;

  constructor(private userDataService: UserDataService, private snackBarService: SnackBarService, private zone: NgZone) { }

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

  post() {
    if (this.registerForm.invalid) {
      return;
    }

    this.userDataService.post(this.user).subscribe({
      next: () => {
        console.log('Usuário cadastrado com sucesso!');
        alert('Usuário cadastrado com sucesso!');
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
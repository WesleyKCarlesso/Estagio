import { Component, OnInit, NgZone } from '@angular/core';
import { UserDataService } from '../../data-services/user.data-service';
import { SnackBarService } from '../../data-services/snack-bar.service';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mydata',
  templateUrl: './mydata.component.html',
  styleUrls: ['./mydata.component.css']
})
export class MyDataComponent {

  user: any = {};
  myDataForm!: FormGroup;

  constructor(private userDataService: UserDataService, private snackBarService: SnackBarService, private router: Router) { }

  ngOnInit() {
    this.getUser();

    this.myDataForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      gender: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^\+?[0-9]{2}\s?[0-9]{8,9}$/)]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    }, { validators: this.checkPasswords })
  }

  getUser() {
    const userLoggedString = localStorage.getItem("user_logged");

    if (!!userLoggedString) {
      this.user.id = JSON.parse(userLoggedString).user.id;
    }

    this.userDataService.getById(this.user.id).subscribe({
      next: (user: any) => {
        user.password = '';
        this.user = user;

        this.myDataForm.patchValue({
          name: user.name,
          email: user.email,
          phone: user.phone
        });
      },
      error: (error) => {
        console.error('Erro ao buscar usuário:', error);
        let errorMessage = 'Erro ao buscar usuário. Por favor, tente novamente mais tarde.';
        if (error.status == 400) {
          this.snackBarService.openSnackBar(error.error, "Entendido");
        }
        else {
          this.snackBarService.openSnackBar(errorMessage, "Entendido");
        }
      }
    });
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value
    return pass === confirmPass? null : { notSame: true }
  }

  get name() {
    return this.myDataForm.get('name')!;
  }

  get email() {
    return this.myDataForm.get('email')!;
  }

  get gender() {
    return this.myDataForm.get('gender')!;
  }

  get phone() {
    return this.myDataForm.get('phone')!;
  }

  get password() {
    return this.myDataForm.get('password')!;
  }

  get confirmPassword() {
    return this.myDataForm.get('confirmPassword')!;
  }

  update() {
    if (this.myDataForm.invalid) {
      return;
    }

    this.user.sex = parseInt(this.user.sex, 10);

    this.userDataService.update(this.user).subscribe({
      next: () => {
        this.snackBarService.openSnackBar('Usuário atualizado com sucesso!', "Entendido");
      },
      error: (error) => {
        console.error('Erro ao atualizar usuário:', error);
        let errorMessage = 'Erro ao atualizar usuário. Por favor, tente novamente mais tarde.';
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

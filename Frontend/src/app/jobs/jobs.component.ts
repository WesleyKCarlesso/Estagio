import { Component } from '@angular/core';
import { JobDataService } from '../data-services/job.data-service';
import { SnackBarService } from '../data-services/snack-bar.service';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent {
  job: any = {};
  jobs: any[] = [];
  jobsForm!: FormGroup;
  showList: boolean = true;
  isNew: boolean = false;

  constructor(private jobDataService: JobDataService, private snackBarService: SnackBarService, private router: Router) { }

  ngOnInit() {
    this.getAll();

    this.jobsForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      duration: new FormControl('', [
        Validators.required,
        this.rangeValidator(0, 500)
      ]),
      intervalDuration: new FormControl('', [
        Validators.required,
        this.rangeValidator(0, 500)
      ]),
      startInterval: new FormControl('', [
        Validators.required,
        this.rangeValidator(0, 500)
      ])
    }, { validators: this.checkTimes });
  }

  checkTimes: ValidatorFn = (group: AbstractControl):  ValidationErrors | null =>  {
    let duration = group.get('duration')?.value;
    let intervalDuration = group.get('intervalDuration')?.value;
    let startInterval = group.get('startInterval')?.value;

    var valid = true;

    if (intervalDuration > duration || startInterval > duration) {
      valid = false;
    }
    if ((startInterval + intervalDuration) > duration) {
      valid = false;
    }

    return true ? null : { invalidTimes: true }
  }
  
  rangeValidator(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value !== null && (value < min || value > max)) {
        return { 'rangeError': { value } };
      }
      return null;
    };
  }

  getAll() {
    this.jobDataService.getAll().subscribe({
      next: (data: any) => {
        this.jobs = data;
        this.showList = true;
      },
      error: (error) => {
        console.error('Erro ao buscar os serviços:', error);
        let errorMessage = 'Erro ao buscar os serviços. Por favor, tente novamente mais tarde.';
        if (error.status == 400) {
          this.snackBarService.openSnackBar(error.error, "Entendido");
        }
        else {
          this.snackBarService.openSnackBar(errorMessage, "Entendido");
        }
      }
    });
  }

  get name() {
    return this.jobsForm.get('name')!;
  }

  get description() {
    return this.jobsForm.get('description')!;
  }

  get duration() {
    return this.jobsForm.get('duration')!;
  }

  get intervalDuration() {
    return this.jobsForm.get('intervalDuration')!;
  }

  get startInterval() {
    return this.jobsForm.get('startInterval')!;
  }

  save() {
    if (this.jobsForm.invalid) {
      return;
    }

    if (this.isNew) {
      this.jobDataService.create(this.job).subscribe({
        next: () => { 
          this.snackBarService.openSnackBar("Serviço criado com sucesso.", "Entendido");
          
          this.showList = false;
          this.job = {};
          this.getAll();
        },
        error: (error) => {
          console.error('Erro ao criar o serviço:', error);
          let errorMessage = 'Erro ao criar o serviço. Por favor, tente novamente mais tarde.';
          if (error.status == 400) {
            this.snackBarService.openSnackBar(error.error, "Entendido");
          }
          else {
            this.snackBarService.openSnackBar(errorMessage, "Entendido");
          }
        }
      });
    } else {
      this.jobDataService.update(this.job).subscribe({
        next: () => { 
          this.snackBarService.openSnackBar("Serviço atualizado com sucesso.", "Entendido");
          
          this.showList = false;
          this.job = {};
          this.getAll();
        },
        error: (error) => {
          console.error('Erro ao atualizado o serviço:', error);
          let errorMessage = 'Erro ao atualizado o serviço. Por favor, tente novamente mais tarde.';
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

  createNew() {
    this.showList = false;
    this.isNew = true;
  }

  cancel() {
    this.showList = true;
    this.job = [];
  }

  openDetails(job: any) {
    this.showList = false;
    this.job = job;
    this.isNew = false;

    this.jobsForm.patchValue({
      name: job.name,
      description: job.description,
      duration: job.duration,
      intervalDuration: job.intervalDuration,
      startInterval: job.startInterval
    });
  }

  delete(job: any) {
    this.jobDataService.delete(job.id).subscribe({
      next: () => { 
        this.snackBarService.openSnackBar("Serviço deletado com sucesso.", "Entendido");
        
        this.showList = false;
        this.job = {};
        this.getAll();
      },
      error: (error) => {
        console.error('Erro ao deletar o serviço:', error);
        let errorMessage = 'Erro ao deletar o serviço. Por favor, tente novamente mais tarde.';
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
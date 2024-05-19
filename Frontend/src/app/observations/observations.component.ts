import { Component, OnInit, NgZone } from '@angular/core';
import { UserDataService } from '../data-services/user.data-service';
import { SnackBarService } from '../data-services/snack-bar.service';

@Component({
  selector: 'app-observations',
  templateUrl: './observations.component.html',
  styleUrl: './observations.component.css'
})
export class ObservationsComponent implements OnInit {

  users: any = [];

  constructor(private userDataService: UserDataService, private snackBarService: SnackBarService) { }

  ngOnInit() {
    this.getAllUsers()
  }

  getAllUsers() {
    this.userDataService.getAll().subscribe((data: any) => {
      data.forEach((element: any) => {
        this.users.push(element)
      });
    })
  }

  saveObservation(user: any) {
    this.userDataService.updateObservation(user.id, user.observation).subscribe({
      next: () => {
        this.snackBarService.openSnackBar('Observação do usuário atualizada com sucesso!', "Entendido");
      },
      error: (error) => {
        console.error('Erro ao atualizar a observação:', error);
        let errorMessage = 'Erro ao atualizar a observação. Por favor, tente novamente mais tarde.';
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

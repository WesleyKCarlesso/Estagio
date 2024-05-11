import { Component, OnInit } from "@angular/core";
import { ScheduleDataService } from "../../data-services/schedule.data-service";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { CalendarEvent } from "angular-calendar";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  isLogged: boolean = false;
  isAdmin: boolean = false;
  options = ["1", "2", "3", "4"];
  selectedOption = this.options[0];
  selectedTime: string = '';
  date: Date = new Date()
  userId: string = ''
  snackBarService: any;
  events: CalendarEvent[] = []

  constructor(private scheduleDataService: ScheduleDataService) { }

  ngOnInit() {
    const userLoggedString = localStorage.getItem("user_logged");

    this.isLogged = !!userLoggedString;
    console.log(this.isLogged)

    console.log('data inicial')
    console.log(this.date)
    if (!!userLoggedString) {
      this.isAdmin = JSON.parse(userLoggedString).user.isAdmin;
      this.userId = JSON.parse(userLoggedString).user.id;
      console.log('logado:')
      console.log(this.userId)
    }
    console.log('get all')
    this.scheduleDataService.getAll().subscribe((data: any) => {
      data.forEach((element: any) => {
        if (this.isAdmin) {
          this.events.push(
            {
              start: (new Date(element.serviceDate)),
              end: (new Date(element.serviceDate)),
              resizable: {
                beforeStart: false,
                afterEnd: false
              },
              draggable: true,
              color: { primary: '#0000aa', secondary: '#0000aa' },
              title: 'test'
            }
          )
        }
        else {
          console.log('aqui')
          console.log(this.userId)
          console.log(element.userId)
          if (this.userId != element.userId) {
          this.events.push(
            {
              start: (new Date(element.serviceDate)),
              end: (new Date(element.serviceDate)),
              resizable: {
                beforeStart: false,
                afterEnd: false
              },
              draggable: false,
              color: { primary: 'ff0000', secondary: '#ff0000' },
              title: 'test'
            }
          )
          }
          else {
          this.events.push(
            {
              start: (new Date(element.serviceDate)),
              end: (new Date(element.serviceDate)),
              resizable: {
                beforeStart: false,
                afterEnd: false
              },
              draggable: true,
              color: { primary: '00ff00', secondary: '#00ff00' },
              title: 'test'
            }
          )
          }
        }
      });
    });
  }

  onDropdownChange(option: Event) {
    console.log(option);
  }

  onDateChange(option: MatDatepickerInputEvent<any, any>) {
    console.log(option)
  }

  onTimeChange(option: Event) {
    console.log(option)
  }

  save() {
    this.date.setMinutes(parseInt(this.selectedTime.split(':')[1]))
    this.date.setHours(parseInt(this.selectedTime.split(':')[0]))

    this.scheduleDataService.create({
      "serviceDate": this.date.toISOString(),
      "jobId": "2698A901-205B-49EF-B1F2-0B0DA19E2204",
      "userId": this.userId,
    }).subscribe({
      next: (data: any) => {
        // this.snackBarService.openSnackBar('Login realizado com sucesso.', "Entendido");
      },
      error: (error) => {
        console.error('Erro ao cadastrar servico:', error);
        let errorMessage = 'Erro ao cadastrar servico. Por favor, tente novamente mais tarde.';
        if (error.status == 400) {
          this.snackBarService.openSnackBar(error.error, "Entendido");
        }
        else {
          this.snackBarService.openSnackBar(errorMessage, "Entendido");
        }
      }
    });

    this.events.push({
      draggable: true,
      title: 'test',
      start: this.date
    })
    console.log(this.date.toISOString())
    console.log('save')
    console.log('get all')
    this.scheduleDataService.getAll().subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.error('Failed to retrieve data:', error);
      }
    )
  }
}

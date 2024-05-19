import { Component, OnInit } from "@angular/core";
import { ScheduleDataService } from "../../data-services/schedule.data-service";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { JobDataService } from "../../data-services/job.data-service";
import { CalendarEvent } from "angular-calendar";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  isLogged: boolean = false;
  isAdmin: boolean = false;
  options: any = [];
  selectedOption: any = {};
  selectedOptionId: String = ''
  selectedTime: string = '';
  date: Date = new Date()
  userId: string = ''
  snackBarService: any;
  events: CalendarEvent[] = []

  constructor(private scheduleDataService: ScheduleDataService, private jobDataServce: JobDataService) { }

  ngOnInit() {
    const userLoggedString = localStorage.getItem("user_logged");
    this.jobDataServce.getAll().subscribe((data: any) => {
      data.forEach((element: any) => {
        this.options.push(element)
      }
      )
    })

    this.isLogged = !!userLoggedString;
    if (!!userLoggedString) {
      this.isAdmin = JSON.parse(userLoggedString).user.isAdmin;
      this.userId = JSON.parse(userLoggedString).user.id;
    }
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
              id: element.id,
              draggable: true,
              color: { primary: '#0000aa', secondary: '#0000aa' },
              title: 'test'
            }
          )
        }
        else {
          if (this.userId != element.userId) {
            this.events.push(
              {
                start: (new Date(element.serviceDate)),
                end: (new Date(element.serviceDate)),
                resizable: {
                  beforeStart: false,
                  afterEnd: false
                },
                id: element.id,
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
                id: element.id,
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
    this.options.forEach((element: any) => {
      if(element.name === this.selectedOption) {
        this.selectedOptionId = element.id
      }
    });
  }

  onDateChange(option: MatDatepickerInputEvent<any, any>) {
  }

  onTimeChange(option: Event) {
  }

  save() {
    this.date.setMinutes(parseInt(this.selectedTime.split(':')[1]))
    this.date.setHours(parseInt(this.selectedTime.split(':')[0]))

    this.scheduleDataService.create({
      "serviceDate": this.date.toISOString(),
      "jobId": this.selectedOptionId,
      "userId": this.userId,
    }).subscribe({
      next: (data: any) => {
        this.snackBarService.openSnackBar('Serviço cadastrado com sucesso.', "Entendido");
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
    this.scheduleDataService.getAll().subscribe(
      (data) => {
      },
      (error) => {
        console.error('Failed to retrieve data:', error);
      }
    )
  }

  logout() {
    localStorage.clear();

    window.location.reload();
  }
}

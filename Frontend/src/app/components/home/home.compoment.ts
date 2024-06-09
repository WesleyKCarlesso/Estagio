import { Component, OnInit, OnDestroy } from "@angular/core";
import { ScheduleDataService } from "../../data-services/schedule.data-service";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { JobDataService } from "../../data-services/job.data-service";
import { CalendarEvent, CalendarEventAction } from "angular-calendar";
import { SnackBarService } from '../../data-services/snack-bar.service';

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
  events: CalendarEvent[] = [];
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.scheduleDataService.delete(event.id).subscribe({
          next: (data: any) => {
            window.location.reload();
          },
          error: (error) => {
            console.error('Erro ao deletar servico:', error);
            let errorMessage = 'Erro ao deletar servico. Por favor, tente novamente mais tarde.';
            if (error.status == 400) {
              this.snackBarService.openSnackBar(error.error, "Entendido");
            }
            else {
              this.snackBarService.openSnackBar(errorMessage, "Entendido");
            }
          }
        });
      },
    },
  ];
  hours: any = [];

  constructor(private scheduleDataService: ScheduleDataService, private jobDataServce: JobDataService, private snackBarService: SnackBarService) { }

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
              end: (new Date(element.serviceFinish)),
              resizable: {
                beforeStart: false,
                afterEnd: false
              },
              actions: this.actions,
              id: element.id,
              draggable: true,
              color: { primary: '#0000aa', secondary: '#0000aa' },
              title: element.description
            }
          )
        }
        else {
          if (this.userId != element.userId) {
            this.events.push(
              {
                start: (new Date(element.serviceDate)),
                end: (new Date(element.serviceFinish)),
                resizable: {
                  beforeStart: false,
                  afterEnd: false
                },
                id: element.id,
                draggable: false,
                color: { primary: 'ff0000', secondary: '#ff0000' },
                title: 'Horário reservado'
              }
            )
          }
          else {
            this.events.push(
              {
                start: (new Date(element.serviceDate)),
                end: (new Date(element.serviceFinish)),
                resizable: {
                  beforeStart: false,
                  afterEnd: false
                },
                actions: this.actions,
                draggable: true,
                id: element.id,
                color: { primary: '00ff00', secondary: '#00ff00' },
                title: element.description
              }
            )
          }
        }
      });
    });
    document.getElementById('refreshSchedulesButton');
  }

  ngAfterViewInit() {
    this.hours = document.getElementsByClassName('cal-time');

    Array.from(this.hours).forEach((element: any) => {
      const textContent = element.textContent.trim();
      switch (textContent) {
        case '6 PM':
          element.textContent = '18:00';
          break;
        case '7 PM':
          element.textContent = '19:00';
          break;
        case '8 PM':
          element.textContent = '20:00';
          break;
        case '9 AM':
          element.textContent = '09:00';
          break;
        case '10 AM':
          element.textContent = '10:00';
          break;
        case '11 AM':
          element.textContent = '11:00';
          break;
        case '12 PM':
          element.textContent = '12:00';
          break;
        case '1 PM':
          element.textContent = '13:00';
          break;
        case '2 PM':
          element.textContent = '14:00';
          break;
        case '3 PM':
          element.textContent = '15:00';
          break;
        case '4 PM':
          element.textContent = '16:00';
          break;
        case '5 PM':
          element.textContent = '17:00';
          break;
        case '8 AM':
          element.textContent = '08:00';
          break;
        default:
          break;
      }
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
    this.date.setMinutes(parseInt(this.selectedTime.split(':')[1]));
    this.date.setHours(parseInt(this.selectedTime.split(':')[0]));

    this.date.setSeconds(0);

    if (this.date.getHours() < 8 || this.date.getHours() >= 19) {
      this.snackBarService.openSnackBar("Insira um horário entre as 08:00 e as 18:00.", "Entendido");
      return;
    }

    if (this.date.getDay() == 0 || this.date.getDay() == 1) {
      this.snackBarService.openSnackBar("Não é possível inserir um horário domingo ou segunda-feira.", "Entendido");
      return;  
    }

    var isTimeConflict = false;

    this.events.forEach(x => {
      x.start.setSeconds(0);
      x.end?.setSeconds(0);

      var start = x.start;
      var end = x.end ?? new Date();

      if (this.date >= start && this.date < end) {
        isTimeConflict = true;
        return;
      }
    });

    if (isTimeConflict) {
      this.snackBarService.openSnackBar("Este horário está indisponível", "Entendido");
      return;
    }

    this.scheduleDataService.create({
      "serviceDate": this.date.toISOString(),
      "serviceFinish": this.date.toISOString(),
      "jobId": this.selectedOptionId,
      "userId": this.userId,
      "description": ""
    }).subscribe({
      next: (data: any) => {
        window.location.reload();
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
  }

  logout() {
    localStorage.clear();

    window.location.reload();
  }
}

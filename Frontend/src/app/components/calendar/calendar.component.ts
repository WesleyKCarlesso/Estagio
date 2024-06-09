import { Input, Component, ChangeDetectionStrategy, ViewChild, TemplateRef, } from "@angular/core";
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours, } from "date-fns";
import { Subject } from "rxjs";
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView, } from "angular-calendar";
import { EventColor } from "calendar-utils";
import { ScheduleDataService } from "../../data-services/schedule.data-service";
import { SnackBarService } from '../../data-services/snack-bar.service';

const colors: Record<string, EventColor> = {
  red: {
    primary: "#ad2121",
    secondary: "#FAE3E3",
  },
  blue: {
    primary: "#1e90ff",
    secondary: "#D1E8FF",
  },
  yellow: {
    primary: "#e3bc08",
    secondary: "#FDF1BA",
  },
};

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.css"],
})
export class CalendarComponent {
  @Input() events: CalendarEvent[] = [];

  constructor(private scheduleDataService: ScheduleDataService, private snackBarService: SnackBarService) { }

  locale: Intl.Locale = new Intl.Locale("pt-BR")
  viewDate: Date = new Date();

  refresh = new Subject<void>();

  activeDayIsOpen: boolean = true;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    event.end = newEnd;
    event.start = newStart;
    this.handleEvent("Dropped or resized", event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.scheduleDataService.hasTimeConflict({ "id": event.id, "serviceDate": event.start, "serviceFinish": event.end, "description": "" }).subscribe({
      next: (data: any) => {
        if (data) {
          this.snackBarService.openSnackBar("Horário indisponível.", "Entendido");
          return;
        }
    
        if (event.start.getHours() < 8 || event.start.getHours() >= 19) {
          this.snackBarService.openSnackBar("Insira um horário entre as 08:00 e as 18:00.", "Entendido");
          return;
        }
    
        if (event.start.getDay() == 0 || event.start.getDay() == 1) {
          this.snackBarService.openSnackBar("Não é possível inserir um horário domingo ou segunda-feira.", "Entendido");
          return;  
        }
    
        this.scheduleDataService.update({
          "id": event.id,
          "serviceDate": event.start,
          "serviceFinish": event.end,
          "description": ""
        }).subscribe({
          next: (data: any) => {
            window.location.reload();
          },
          error: (error) => {
            window.location.reload();
    
            this.snackBarService.openSnackBar(error.error, "Entendido");
          }
        })
      },
      error: (error) => {
        this.snackBarService.openSnackBar(error.error, "Entendido");
      }
    });
  }

  addEventWithParams(data: any): void {
    this.events = [
      ...this.events,
      {
        title: data.name,
        start: startOfDay(data.start),
        end: endOfDay(data.end),
        color: { primary: "#ff0000", secondary: "#ff0000" },
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
    this.refresh.next();
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}

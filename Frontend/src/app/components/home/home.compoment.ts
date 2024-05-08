import { Component, OnInit } from "@angular/core";
import { ScheduleDataService } from "../../data-services/schedule.data-service";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";

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

  constructor(private scheduleDataService: ScheduleDataService) { }

  ngOnInit() {
    const userLoggedString = localStorage.getItem("user_logged");

    this.isLogged = !!userLoggedString;

    console.log('data inicial')
    console.log(this.date)
    if (!!userLoggedString) {
      this.userId = JSON.parse(userLoggedString).user.id;
      console.log('logado:')
      console.log(this.userId)
    }
    console.log('get all')
    this.scheduleDataService.getAll().subscribe((data: any) => {
      console.log(data)
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
      "jobId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "userId": this.userId,
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

import { NgModule } from "@angular/core";
import { registerLocaleData } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.compoment";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { Interceptor } from "./app.interceptor.module";
import { UserDataService } from "./data-services/user.data-service";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { CalendarComponent } from "./components/calendar/calendar.component";
import { MyDataComponent } from "./components/mydata/mydata.component";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { JobsComponent } from "./components/jobs/jobs.component";
import { ScheduleDataService } from "./data-services/schedule.data-service";
import { JobDataService } from "./data-services/job.data-service";
import { ObservationsComponent } from "./components/observations/observations.component";
import localeBr from '@angular/common/locales/pt';
import { LOCALE_ID } from '@angular/core';

registerLocaleData(localeBr, 'br');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CalendarComponent,
    MyDataComponent,
    JobsComponent,
    ObservationsComponent
  ],
  imports: [
    CommonModule,
    NgxMaterialTimepickerModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    RouterModule.forRoot([
      { path: "home", component: HomeComponent },
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "mydata", component: MyDataComponent },
      { path: "jobs", component: JobsComponent },
      { path: "observations", component: ObservationsComponent },
      { path: "", redirectTo: "/home", pathMatch: "full" },
      { path: "**", redirectTo: "/home", pathMatch: "full" },
    ]),
    Interceptor,
  ],
  providers: [UserDataService, ScheduleDataService, JobDataService, { provide: LOCALE_ID, useValue: 'br' }],
  exports: [RouterModule],
  bootstrap: [AppComponent],
})
export class AppRoutingModule {}

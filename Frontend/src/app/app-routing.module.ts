import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.compoment';
import { LoginComponent } from './login/login.component';
import { CalendarComponent } from './calendar/calendar.component';
import { Interceptor } from './app.interceptor.module';

const routes: Routes = [];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavMenuComponent,
    LoginComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'calendar', component: CalendarComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: '**', redirectTo: '/home', pathMatch: 'full' }
    ]),
    Interceptor
  ],
  providers: [
    
  ],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppRoutingModule { }

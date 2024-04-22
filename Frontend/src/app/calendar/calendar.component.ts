import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html',
})
export class DemoComponent {
  viewDate: Date = new Date();

  events: CalendarEvent[] = [
    {
      title: 'An all day event',
      color: {primary: '#ffff00', secondary: '#00ff00'},
      start: new Date(),
      allDay: true,
    },
    {
      title: 'A non all day event',
      color: {primary: '#0000ff', secondary: '#0000ff'},
      start: new Date(),
    },
  ];
}

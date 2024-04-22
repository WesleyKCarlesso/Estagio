import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html',
})
export class DemoComponent {
  view: CalendarView = CalendarView.Month;

  viewDate = new Date();

  events: CalendarEvent[] = [
    {
      title: 'Draggable event',
      color: {primary: '#00ffff', secondary: '#00ffff'},
      start: new Date(),
      draggable: true,
    },
    {
      title: 'A non draggable event',
      color: {primary: '#0000ff', secondary: '#0000ff'},
      start: new Date(),
    },
    {
      title: 'A non draggable event',
      color: {primary: '#0000ff', secondary: '#0000ff'},
      start: new Date(),
    },
  ];

  refresh = new Subject<void>();

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
  }
}
